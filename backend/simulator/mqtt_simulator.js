/**
 * mqtt_simulator.js
 * 
 * Simula un ESP32 publicando telemetría al broker MQTT.
 * Úsalo para validar el flujo completo sin hardware real.
 * 
 * Uso: npm run simulate
 *   o: node simulator/mqtt_simulator.js [broker_url] [device_id]
 */

require('dotenv').config();
const mqtt = require('mqtt');

const BROKER_URL = process.argv[2] || process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
const DEVICE_ID = process.argv[3] || 'ESP32_SIMULATED_AA:BB:CC:DD:EE:FF';
const INTERVAL_MS = 5000;

const client = mqtt.connect(BROKER_URL, {
  clientId: `simulator-${Date.now()}`
});

// ── Rangos realistas para un jardín ─────────────
const ranges = {
  temperature:   { min: 15, max: 38, current: 24, drift: 0.5 },
  humidity_air:  { min: 30, max: 95, current: 60, drift: 2 },
  humidity_soil: { min: 200, max: 800, current: 500, drift: 15 },
  light:         { min: 50, max: 4095, current: 2000, drift: 100 },
  conductivity:  { min: 100, max: 1500, current: 600, drift: 30 },
  flow_rate:     { min: 0, max: 5.5, current: 0, drift: 0.1 },
  flow_total:    { min: 0, max: 999, current: 0, drift: 0 }
};

/**
 * Simula un walk aleatorio con tendencia (no salta,  varía orgánicamente)
 */
function drift(sensor) {
  const r = ranges[sensor];
  const delta = (Math.random() - 0.5) * 2 * r.drift;
  r.current = Math.max(r.min, Math.min(r.max, r.current + delta));
  return sensor === 'temperature' || sensor === 'flow_rate'
    ? parseFloat(r.current.toFixed(1))
    : Math.round(r.current);
}

client.on('connect', () => {
  console.log(`\n🌱 Simulador conectado al broker → ${BROKER_URL}`);
  console.log(`   Device ID: ${DEVICE_ID}`);
  console.log(`   Intervalo: ${INTERVAL_MS}ms`);
  console.log(`   Topic: jardin/${DEVICE_ID}/sensores\n`);

  // Escuchar comandos (simula la respuesta del ESP32)
  const cmdTopic = `jardin/${DEVICE_ID}/comandos`;
  client.subscribe(cmdTopic, () => {
    console.log(`   Escuchando comandos en: ${cmdTopic}\n`);
  });

  // Publicar telemetría periódicamente
  setInterval(() => {
    const payload = {
      device_id: DEVICE_ID,
      timestamp: Date.now(),
      sensors: {
        temperature: drift('temperature'),
        humidity_air: drift('humidity_air'),
        humidity_soil: drift('humidity_soil'),
        light: drift('light'),
        conductivity: drift('conductivity'),
        flow_rate: drift('flow_rate'),
        flow_total: drift('flow_total')
      }
    };

    const topic = `jardin/${DEVICE_ID}/sensores`;
    client.publish(topic, JSON.stringify(payload));

    const s = payload.sensors;
    console.log(
      `[${new Date().toLocaleTimeString()}] ` +
      `T:${s.temperature}°C | H-air:${s.humidity_air}% | H-soil:${s.humidity_soil} | ` +
      `Luz:${s.light} | Cond:${s.conductivity} | Flow:${s.flow_rate}L/min`
    );
  }, INTERVAL_MS);
});

// Responder a comandos simulando confirmación del ESP32
client.on('message', (topic, message) => {
  try {
    const cmd = JSON.parse(message.toString());
    console.log(`\n⚡ Comando recibido: ${cmd.action} = ${cmd.value}`);

    // Simular ejecución del actuador
    if (cmd.action === 'pump') {
      ranges.flow_rate.current = cmd.value === 1 ? 2.3 : 0;
      console.log(`   Bomba ${cmd.value === 1 ? 'ENCENDIDA' : 'APAGADA'}`);
    } else if (cmd.action === 'reset_flow') {
      ranges.flow_total.current = 0;
      console.log('   Contador de flujo reseteado');
    } else if (cmd.action === 'led') {
      console.log(`   LED color: ${cmd.value}`);
    }

    // Publicar confirmación
    const statusTopic = `jardin/${DEVICE_ID}/status`;
    const confirmation = {
      action: cmd.action,
      status: 'ok',
      timestamp: Date.now()
    };
    client.publish(statusTopic, JSON.stringify(confirmation));
    console.log(`   Confirmación enviada → ${statusTopic}\n`);
  } catch (err) {
    console.error('Error procesando comando:', err.message);
  }
});

client.on('error', (err) => {
  console.error('Error MQTT:', err.message);
});

// Cleanup
process.on('SIGINT', () => {
  console.log('\nSimulador detenido.');
  client.end();
  process.exit();
});
