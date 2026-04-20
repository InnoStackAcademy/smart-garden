const mqtt = require('mqtt');
const SensorReading = require('../models/SensorReading');
const DeviceCommand = require('../models/DeviceCommand');
const { SOCKET_EVENTS, MQTT_TOPICS } = require('../../../shared/constants');

let client = null;
let io = null;

/**
 * Inicializa el cliente MQTT y sus suscripciones.
 * @param {import('socket.io').Server} socketServer - instancia de Socket.IO para reemitir eventos
 */
function initMqtt(socketServer) {
  io = socketServer;

  const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
  const clientId = process.env.MQTT_CLIENT_ID || `sg-backend-${Date.now()}`;

  client = mqtt.connect(brokerUrl, {
    clientId,
    clean: true,
    reconnectPeriod: 5000
  });

  client.on('connect', () => {
    console.log(`[MQTT] Conectado al broker → ${brokerUrl}`);

    // Suscripción a telemetría
    client.subscribe(MQTT_TOPICS.SENSORS, { qos: 0 }, (err) => {
      if (err) console.error('[MQTT] Error suscribiendo a sensores:', err.message);
      else console.log(`[MQTT] Suscrito a ${MQTT_TOPICS.SENSORS}`);
    });

    // Suscripción a status
    client.subscribe(MQTT_TOPICS.STATUS, { qos: 0 }, (err) => {
      if (err) console.error('[MQTT] Error suscribiendo a status:', err.message);
      else console.log(`[MQTT] Suscrito a ${MQTT_TOPICS.STATUS}`);
    });
  });

  client.on('message', async (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      const segments = topic.split('/');
      const deviceId = segments[1];
      const channel = segments[2];

      if (channel === 'sensores') {
        await handleSensorData(deviceId, payload);
      } else if (channel === 'status') {
        await handleCommandStatus(deviceId, payload);
      }
    } catch (err) {
      console.error(`[MQTT] Error procesando mensaje de ${topic}:`, err.message);
    }
  });
  client.on('error', (err) => {
    console.error('[MQTT] Error de conexión:', err.message);
  });

  client.on('reconnect', () => {
    console.log('[MQTT] Reconectando al broker...');
  });

  client.on('offline', () => {
    console.warn('[MQTT] Cliente desconectado del broker.');
  });
}

/**
 * Persiste telemetría y emite al frontend vía Socket.IO
 */
async function handleSensorData(deviceId, payload) {
  const reading = new SensorReading({
    device_id: deviceId,
    timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
    sensors: payload.sensors || payload
  });

  await reading.save();
  console.log(`[MQTT] Telemetría guardada → ${deviceId}`);

  if (io) {
    io.emit(SOCKET_EVENTS.SENSOR_UPDATE, {
      device_id: deviceId,
      timestamp: reading.timestamp,
      sensors: reading.sensors
    });
  }
}

/**
 * Actualiza el estado de un comando y notifica al frontend
 */
async function handleCommandStatus(deviceId, payload) {
  const { action, status } = payload;

  const command = await DeviceCommand.findOneAndUpdate(
    { device_id: deviceId, action, status: 'sent' },
    { status: status || 'confirmed', confirmed_at: new Date() },
    { sort: { created_at: -1 }, new: true }
  );

  if (command && io) {
    io.emit(SOCKET_EVENTS.COMMAND_CONFIRMED, {
      device_id: deviceId,
      action: command.action,
      status: command.status,
      confirmed_at: command.confirmed_at
    });
  }
}

/**
 * Publica un comando al topic MQTT del device
 */
function publishCommand(deviceId, action, value) {
  if (!client || !client.connected) throw new Error('MQTT no conectado');

  const topic = `jardin/${deviceId}/comandos`;
  const payload = JSON.stringify({ action, value });

  client.publish(topic, payload, { qos: 0 });
}

module.exports = { initMqtt, publishCommand };
