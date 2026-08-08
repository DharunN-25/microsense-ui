import React from 'react';

export const Card = ({ children, className = '', header, action, highlight = false, borderGlow = null }) => {
  let accentBorder = 'border-slate-200/70';
  if (borderGlow === 'teal' || highlight) accentBorder = 'border-blue-500/20 ring-1 ring-blue-200/60';
  else if (borderGlow === 'rose') accentBorder = 'border-rose-400/20 ring-1 ring-rose-200/50';
  else if (borderGlow === 'emerald') accentBorder = 'border-emerald-400/20 ring-1 ring-emerald-200/50';

  return (
    <div className={`bg-white/95 border ${accentBorder} rounded-[24px] p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] transition-all duration-200 animate-fade-up ${className}`}>
      {header && (
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100/80">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
            <h3 className="font-semibold text-slate-900 text-sm tracking-[0.18em] uppercase font-sans">{header}</h3>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
