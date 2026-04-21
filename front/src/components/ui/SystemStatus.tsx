import React, { useState, useEffect } from 'react';

const SystemStatus: React.FC = () => {
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(45);
  const totalRam = 512;

  // Simulación de métricas del sistema hasta tener un endpoint real en el backend
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.max(5, Math.min(95, prev + (Math.random() * 4 - 2))));
      setRam(prev => Math.max(40, Math.min(480, prev + (Math.random() * 2 - 1))));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-on-surface p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
      <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
      <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">analytics</span>
        Estado del Sistema
      </h4>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs opacity-60">Carga CPU</span>
          <span className="text-xs font-bold">{cpu.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-1000" 
            style={{ width: `${cpu}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs opacity-60">Memoria</span>
          <span className="text-xs font-bold">{ram.toFixed(0)}MB / {totalRam}MB</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-secondary h-full transition-all duration-1000" 
            style={{ width: `${(ram / totalRam) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
