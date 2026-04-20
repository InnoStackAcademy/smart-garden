require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { initSocket } = require('./services/socketService');
const { initMqtt } = require('./services/mqttService');
const devicesRouter = require('./routes/devices');
const commandsRouter = require('./routes/commands');

const app = express();
const server = http.createServer(app);

// ── Middleware ───────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ──────────────────────────────────────
app.use('/api/devices', devicesRouter);
app.use('/api/devices', commandsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ── Bootstrap ───────────────────────────────────
async function start() {
  const PORT = process.env.PORT || 3000;

  // 1. Conectar a MongoDB
  await connectDB();

  // 2. Inicializar Socket.IO
  const io = initSocket(server);

  // 3. Inicializar cliente MQTT (pasa Socket.IO para reemitir)
  initMqtt(io);

  // 4. Levantar servidor HTTP
  server.listen(PORT, () => {
    console.log(`\n🌿 Smart Garden Backend corriendo en puerto ${PORT}`);
    console.log(`   REST API  → http://localhost:${PORT}/api`);
    console.log(`   WebSocket → ws://localhost:${PORT}`);
    console.log(`   Health    → http://localhost:${PORT}/api/health\n`);
  });
}

start().catch((err) => {
  console.error('Error fatal al iniciar:', err);
  process.exit(1);
});
