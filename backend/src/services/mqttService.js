const mqtt = require('mqtt');
const SensorReading = require('../models/SensorReading');
const DeviceCommand = require('../models/DeviceCommand');

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

    // Suscripción a telemetría de todos los devices
    client.subscribe('jardin/+/sensores', { qos: 0 }, (err) => {
      if (err) console.error('[MQTT] Error suscribiendo a sensores:', err.message);
      else console.log('[MQTT] Suscrito a jardin/+/sensores');
    });

    // Suscripción a confirmaciones de comandos
    client.subscribe('jardin/+/status', { qos: 0 }, (err) => {
      if (err) console.error('[MQTT] Error suscribiendo a status:', err.message);
      else console.log('[MQTT] Suscrito a jardin/+/status');
    });
  });

  client.on('message', async (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      const segments = topic.split('/');
      // topic format: jardin/{device_id}/{channel}
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

  console.log(`[MQTT] Telemetría guardada → ${deviceId} @ ${reading.timestamp.toISOString()}`);

  // Emitir al frontend en tiempo real
  if (io) {
    io.emit('sensor:update', {
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

  if (command) {
    console.log(`[MQTT] Comando confirmado → ${deviceId}/${action}`);

    if (io) {
      io.emit('command:confirmed', {
        device_id: deviceId,
        action: command.action,
        status: command.status,
        confirmed_at: command.confirmed_at
      });
    }
  } else {
    console.warn(`[MQTT] Confirmación huérfana → ${deviceId}/${action} (no hay comando 'sent' pendiente)`);
  }
}

/**
 * Publica un comando al topic MQTT del device
 */
function publishCommand(deviceId, action, value) {
  if (!client || !client.connected) {
    throw new Error('Cliente MQTT no conectado');
  }

  const topic = `jardin/${deviceId}/comandos`;
  const payload = JSON.stringify({ action, value });

  client.publish(topic, payload, { qos: 0 }, (err) => {
    if (err) console.error(`[MQTT] Error publicando comando a ${topic}:`, err.message);
    else console.log(`[MQTT] Comando publicado → ${topic}: ${payload}`);
  });
}

module.exports = { initMqtt, publishCommand };
