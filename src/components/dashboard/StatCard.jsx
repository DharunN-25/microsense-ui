import React from 'react';

const StatCard = ({ title, value, label, icon: Icon, accentClass }) => {
  return (
    <article className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm min-h-[190px]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{title}</p>
          <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
          <p className="mt-3 text-sm text-slate-500">{label}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-[18px] border border-slate-200 ${accentClass}`}>
          <Icon className="w-[22px] h-[22px] text-slate-900" />
        </div>
      </div>
    </article>
  );
};

export default StatCard;
