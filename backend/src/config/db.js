const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-garden';

  try {
    await mongoose.connect(uri);
    console.log(`[DB] Conectado a MongoDB → ${uri}`);
  } catch (err) {
    console.error('[DB] Error de conexión:', err.message);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error('[DB] Error de conexión persistente:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[DB] Conexión perdida. Mongoose intentará reconectar.');
  });
}

module.exports = { connectDB };
