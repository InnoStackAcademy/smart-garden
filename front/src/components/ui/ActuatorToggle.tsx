import React, { useState, useEffect } from 'react';
import { socketService } from '../../lib/socket';
import { SOCKET_EVENTS } from '../../../../shared/constants';
import type { CommandConfirmedPayload } from '../../../../shared/types';

interface ActuatorToggleProps {
  label: string;
  icon: string;
  action: string;
  deviceId: string;
  initialState?: boolean;
}

const ActuatorToggle: React.FC<ActuatorToggleProps> = ({ 
  label, 
  icon, 
  action,
  deviceId,
  initialState = false 
}) => {
  const [isActive, setIsActive] = useState(initialState);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const socket = socketService.connect();

    const handleConfirmation = (payload: CommandConfirmedPayload) => {
      if (payload.device_id === deviceId && payload.action === action) {
        setIsPending(false);
        // El estado real lo confirmamos aquí si fuera necesario, 
        // pero por ahora confiamos en el optimismo del UI + confirmación visual.
      }
    };

    socket.on(SOCKET_EVENTS.COMMAND_CONFIRMED, handleConfirmation);
    return () => { socket.off(SOCKET_EVENTS.COMMAND_CONFIRMED, handleConfirmation); };
  }, [deviceId, action]);

  const handleToggle = () => {
    const socket = socketService.getSocket();
    if (!socket) return;

    const newState = !isActive;
    setIsActive(newState);
    setIsPending(true);

    // Emitir comando al backend
    socket.emit(SOCKET_EVENTS.COMMAND_SEND, {
      device_id: deviceId,
      action: action,
      value: newState ? 1 : 0
    });
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={isPending}
      className={`flex items-center justify-between w-full p-6 rounded-[2rem] transition-all duration-500 ease-in-out border-2 ${
        isPending ? 'opacity-70 cursor-wait' : ''
      } ${
        isActive 
          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
          : 'bg-surface-container-lowest border-surface-container text-secondary hover:border-primary/30 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
          isActive ? 'bg-white/20' : 'bg-surface-container'
        }`}>
          <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''} ${isPending ? 'animate-spin' : ''}`}>
            {isPending ? 'sync' : icon}
          </span>
        </div>
        <div className="text-left">
          <h5 className="font-bold text-sm">{label}</h5>
          <p className={`text-[10px] font-black uppercase tracking-widest opacity-70`}>
            {isPending ? 'Sending...' : isActive ? 'Active' : 'Idle'}
          </p>
        </div>
      </div>
      
      <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
        isActive ? 'bg-white/30' : 'bg-surface-container'
      }`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 transform ${
          isActive ? 'translate-x-6' : 'translate-x-0 shadow-sm'
        }`}></div>
      </div>
    </button>
  );
};

export default ActuatorToggle;
