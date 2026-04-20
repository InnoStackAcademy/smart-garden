const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema({
  device_id: {
    type: String,
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  sensors: {
    temperature: { type: Number, default: null },
    humidity_air: { type: Number, default: null },
    humidity_soil: { type: Number, default: null },
    light: { type: Number, default: null },
    conductivity: { type: Number, default: null },
    flow_rate: { type: Number, default: null },
    flow_total: { type: Number, default: null }
  }
});

// Índice compuesto para queries frecuentes: "últimas lecturas de un device"
sensorReadingSchema.index({ device_id: 1, timestamp: -1 });

// TTL opcional: eliminar lecturas con más de 90 días (configurable en Ej.2)
// sensorReadingSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 });

module.exports = mongoose.model('SensorReading', sensorReadingSchema);
