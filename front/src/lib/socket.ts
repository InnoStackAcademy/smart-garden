import { io, Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "../../../shared/constants";

// URL del backend (dinámica según el host actual o ajustable por env)
const isBrowser = typeof window !== 'undefined';
const defaultHost = isBrowser ? `${window.location.protocol}//${window.location.hostname}:3000` : "http://localhost:3000";
const SOCKET_URL = import.meta.env.PUBLIC_API_URL || defaultHost;

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(): Socket {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });

      this.socket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log("[WS] Conectado al servidor de BioSync");
      });

      this.socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        console.warn("[WS] Desconectado del servidor");
      });
    }
    return this.socket;
  }

  public getSocket(): Socket | null {
    return this.socket;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = SocketService.getInstance();
