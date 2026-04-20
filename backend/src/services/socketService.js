const { Server } = require('socket.io');

let io = null;

/**
 * Inicializa Socket.IO sobre el servidor HTTP existente.
 * @param {import('http').Server} httpServer
 * @returns {import('socket.io').Server}
 */
function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`[WS] Cliente conectado → ${socket.id}`);

    socket.on('disconnect', (reason) => {
      console.log(`[WS] Cliente desconectado → ${socket.id} (${reason})`);
    });
  });

  console.log('[WS] Socket.IO inicializado');
  return io;
}

function getIO() {
  return io;
}

module.exports = { initSocket, getIO };
