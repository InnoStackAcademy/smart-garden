const express = require('express');
const router = express.Router();
const SensorReading = require('../models/SensorReading');

// GET /api/devices — Lista device_ids únicos
router.get('/', async (req, res) => {
  try {
    const devices = await SensorReading.distinct('device_id');
    res.json({ success: true, data: devices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/devices/:deviceId/readings/latest — Última lectura
router.get('/:deviceId/readings/latest', async (req, res) => {
  try {
    const reading = await SensorReading.findOne(
      { device_id: req.params.deviceId }
    ).sort({ timestamp: -1 });

    if (!reading) {
      return res.status(404).json({ success: false, error: 'Sin lecturas para este device' });
    }

    res.json({ success: true, data: reading });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/devices/:deviceId/readings — Histórico con filtros
router.get('/:deviceId/readings', async (req, res) => {
  try {
    const { from, to, limit = 100 } = req.query;
    const filter = { device_id: req.params.deviceId };

    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = new Date(from);
      if (to) filter.timestamp.$lte = new Date(to);
    }

    const readings = await SensorReading.find(filter)
      .sort({ timestamp: -1 })
      .limit(Math.min(parseInt(limit), 500));

    res.json({ success: true, data: readings, count: readings.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
