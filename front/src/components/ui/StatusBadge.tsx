import React from 'react';
import { useSensorData } from '../../hooks/useSensorData';

interface StatusBadgeProps {
  deviceId: string;
  label: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ deviceId, label }) => {
  const { isConnected, lastUpdate } = useSensorData(deviceId);
  
  // Consideramos "online" si está conectado al socket Y recibimos datos en los últimos 30 segundos
  const isOnline = isConnected && lastUpdate && (new Date().getTime() - lastUpdate.getTime() < 30000);

  const status = isOnline ? 'connected' : 'disconnected';

  const statusColors = {
    connected: 'bg-primary/10 text-primary',
    disconnected: 'bg-error/10 text-error',
    warning: 'bg-tertiary/10 text-tertiary',
  };

  const dotColors = {
    connected: 'bg-primary',
    disconnected: 'bg-error',
    warning: 'bg-tertiary',
  };

  return (
    <div className={`${statusColors[status]} px-4 py-2 rounded-full flex items-center gap-2 border border-current/10 transition-colors duration-500`}>
      <span className="relative flex h-3 w-3">
        {isOnline && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColors[status]} opacity-75`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${dotColors[status]}`}></span>
      </span>
      <span className="text-[10px] font-black uppercase tracking-widest">
        {label}: {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};

export default StatusBadge;
