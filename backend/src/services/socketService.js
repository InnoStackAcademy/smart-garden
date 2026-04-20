const { Server } = require('socket.io');
const { SOCKET_EVENTS } = require('../../../shared/constants');

let io = null;

function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
  });

  // Importación diferida para evitar circularidad
  const { publishCommand } = require('./mqttService');

  io.on('connection', (socket) => {
    console.log(`[WS] Cliente conectado → ${socket.id}`);

    // Escuchar comandos desde el frontend
    socket.on(SOCKET_EVENTS.COMMAND_SEND, (payload) => {
      console.log(`[WS] Comando recibido de ${socket.id}:`, payload);
      try {
        const { device_id, action, value } = payload;
        publishCommand(device_id, action, value);
      } catch (err) {
        console.error('[WS] Error al procesar comando:', err.message);
        socket.emit(SOCKET_EVENTS.ERROR, { message: 'Failed to send command to hardware' });
      }
    });

    socket.on('disconnect', (reason) => {
      console.log(`[WS] Cliente desconectado → ${socket.id}`);
    });
  });

  console.log('[WS] Socket.IO inicializado');
  return io;
}

function getIO() { return io; }

module.exports = { initSocket, getIO };
