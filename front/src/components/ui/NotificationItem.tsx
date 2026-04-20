import React from 'react';

interface NotificationItemProps {
  title: string;
  message: string;
  time: string;
  type: 'critical' | 'warning' | 'info';
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  title, 
  message, 
  time, 
  type 
}) => {
  const typeStyles = {
    critical: 'border-error bg-error/5 text-error',
    warning: 'border-tertiary bg-tertiary/5 text-tertiary',
    info: 'border-primary bg-primary/5 text-primary',
  };

  const iconName = {
    critical: 'warning',
    warning: 'wifi_off',
    info: 'water_drop',
  };

  return (
    <div className={`flex items-start gap-4 p-4 rounded-3xl border-l-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white ${typeStyles[type]}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        type === 'critical' ? 'bg-error/10' : type === 'warning' ? 'bg-tertiary/10' : 'bg-primary/10'
      }`}>
        <span className="material-symbols-outlined text-xl">{iconName[type]}</span>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h6 className="text-xs font-bold text-on-surface">{title}</h6>
          <span className="text-[9px] text-secondary font-medium">{time}</span>
        </div>
        <p className="text-[10px] text-secondary leading-tight line-clamp-2">{message}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
