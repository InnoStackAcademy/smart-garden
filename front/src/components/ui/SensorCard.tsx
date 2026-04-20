import React from 'react';

interface SensorCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon: string;
  trend?: 'up' | 'down' | 'stable';
  color?: 'primary' | 'secondary' | 'tertiary' | 'error';
}

const SensorCard: React.FC<SensorCardProps> = ({ 
  label, 
  value, 
  unit, 
  icon, 
  trend, 
  color = 'primary' 
}) => {
  const colorClasses = {
    primary: 'bg-primary text-white shadow-primary/20',
    secondary: 'bg-secondary text-white shadow-secondary/20',
    tertiary: 'bg-tertiary text-white shadow-tertiary/20',
    error: 'bg-error text-white shadow-error/20',
  };

  return (
    <div className={`${colorClasses[color]} p-8 rounded-[2rem] shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] group`}>
      <div className="flex justify-between items-start mb-6">
        <span className="material-symbols-outlined text-4xl group-hover:rotate-12 transition-transform">
          {icon}
        </span>
        {trend && (
          <span className="material-symbols-outlined text-sm opacity-80">
            {trend === 'up' ? 'trending_up' : trend === 'down' ? 'trending_down' : 'remove'}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <h4 className="text-4xl font-black font-headline tracking-tighter">{value}</h4>
        <span className="text-lg font-bold opacity-80">{unit}</span>
      </div>
      <p className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-bold mt-2">{label}</p>
    </div>
  );
};

export default SensorCard;
