const mongoose = require('mongoose');

const deviceCommandSchema = new mongoose.Schema({
  device_id: {
    type: String,
    required: true,
    index: true
  },
  action: {
    type: String,
    required: true,
    enum: ['pump', 'led', 'reset_flow']
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  status: {
    type: String,
    enum: ['sent', 'confirmed', 'failed', 'timeout'],
    default: 'sent'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  confirmed_at: {
    type: Date,
    default: null
  }
});

deviceCommandSchema.index({ device_id: 1, created_at: -1 });

module.exports = mongoose.model('DeviceCommand', deviceCommandSchema);
