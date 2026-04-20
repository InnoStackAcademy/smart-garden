import React, { useState } from 'react';

interface ActuatorToggleProps {
  label: string;
  icon: string;
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
}

const ActuatorToggle: React.FC<ActuatorToggleProps> = ({ 
  label, 
  icon, 
  initialState = false, 
  onToggle 
}) => {
  const [isActive, setIsActive] = useState(initialState);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <button 
      onClick={handleToggle}
      className={`flex items-center justify-between w-full p-6 rounded-[2rem] transition-all duration-500 ease-in-out border-2 ${
        isActive 
          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
          : 'bg-surface-container-lowest border-surface-container text-secondary hover:border-primary/30 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
          isActive ? 'bg-white/20' : 'bg-surface-container'
        }`}>
          <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>
            {icon}
          </span>
        </div>
        <div className="text-left">
          <h5 className="font-bold text-sm">{label}</h5>
          <p className={`text-[10px] font-black uppercase tracking-widest opacity-70`}>
            {isActive ? 'Active' : 'Idle'}
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
