const express = require('express');
const router = express.Router();
const DeviceCommand = require('../models/DeviceCommand');
const { publishCommand } = require('../services/mqttService');

// POST /api/devices/:deviceId/commands — Enviar comando al device
router.post('/:deviceId/commands', async (req, res) => {
  try {
    const { action, value } = req.body;
    const { deviceId } = req.params;

    // Validación
    const validActions = ['pump', 'led', 'reset_flow'];
    if (!action || !validActions.includes(action)) {
      return res.status(400).json({
        success: false,
        error: `Acción inválida. Permitidas: ${validActions.join(', ')}`
      });
    }

    // Publicar al broker MQTT
    publishCommand(deviceId, action, value);

    // Registrar en la base de datos como 'sent'
    const command = await DeviceCommand.create({
      device_id: deviceId,
      action,
      value,
      status: 'sent'
    });

    res.status(201).json({ success: true, data: command });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/devices/:deviceId/commands — Historial de comandos
router.get('/:deviceId/commands', async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    const commands = await DeviceCommand.find({ device_id: req.params.deviceId })
      .sort({ created_at: -1 })
      .limit(Math.min(parseInt(limit), 200));

    res.json({ success: true, data: commands, count: commands.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
