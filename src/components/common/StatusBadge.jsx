import React from 'react';

export const StatusBadge = ({ type, text, pulse = false, size = 'md' }) => {
  const getStyles = () => {
    switch (type) {
      case 'emerald':
      case 'safe':
      case 'online':
      case 'Low':
      case 'Safe':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'amber':
      case 'warning':
      case 'Moderate':
      case 'Low Risk':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'rose':
      case 'danger':
      case 'critical':
      case 'Critical':
      case 'High':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'teal':
      case 'info':
      case 'active':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getDotColor = () => {
    switch (type) {
      case 'emerald':
      case 'safe':
      case 'online':
      case 'Low':
      case 'Safe':
        return 'bg-emerald-600';
      case 'amber':
      case 'warning':
      case 'Moderate':
        return 'bg-amber-500';
      case 'rose':
      case 'danger':
      case 'critical':
      case 'Critical':
      case 'High':
        return 'bg-rose-600';
      case 'teal':
      case 'info':
      case 'active':
        return 'bg-sky-600';
      default:
        return 'bg-slate-500';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-sans font-semibold rounded-full border ${getStyles()} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()} ${pulse ? 'animate-pulse' : ''}`} />
      {text}
    </span>
  );
};

export default StatusBadge;
