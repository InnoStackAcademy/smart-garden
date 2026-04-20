import { useEffect, useState } from 'react';
import { socketService } from '../lib/socket';
import { SOCKET_EVENTS } from '../../../shared/constants';
import type { SensorUpdatePayload, SensorsData } from '../../../shared/types';

export function useSensorData(deviceId: string) {
  const [data, setData] = useState<SensorsData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = socketService.connect();

    const handleUpdate = (payload: SensorUpdatePayload) => {
      if (payload.device_id === deviceId) {
        setData(payload.sensors);
        setLastUpdate(new Date(payload.timestamp));
      }
    };

    socket.on(SOCKET_EVENTS.CONNECT, () => setIsConnected(true));
    socket.on(SOCKET_EVENTS.DISCONNECT, () => setIsConnected(false));
    socket.on(SOCKET_EVENTS.SENSOR_UPDATE, handleUpdate);

    return () => {
      socket.off(SOCKET_EVENTS.SENSOR_UPDATE, handleUpdate);
    };
  }, [deviceId]);

  return { data, lastUpdate, isConnected };
}
