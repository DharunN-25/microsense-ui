import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid } from 'recharts';

const LDRChart = ({ data }) => {
  return (
    <article className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm animate-fade-up">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Visible Feature Score Over Time</p>
          <p className="mt-1 text-sm text-slate-500">Frame comparison score for visible-filtered features with approximate screening thresholds.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span className="rounded-full border border-slate-200 px-3 py-2">Safe</span>
          <span className="rounded-full border border-slate-200 px-3 py-2">Elevated</span>
          <span className="rounded-full border border-slate-200 px-3 py-2">High</span>
        </div>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 20, left: -10, bottom: 10 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} padding={{ left: 12, right: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 14, borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }} />
            <ReferenceLine y={12} stroke="#10B981" strokeDasharray="4 4" label={{ value: 'No strong evidence', position: 'insideTopLeft', fill: '#10B981', fontSize: 12 }} />
            <ReferenceLine y={30} stroke="#F59E0B" strokeDasharray="4 4" label={{ value: 'Possible evidence', position: 'insideTopLeft', fill: '#F59E0B', fontSize: 12 }} />
            <ReferenceLine y={55} stroke="#EF4444" strokeDasharray="4 4" label={{ value: 'Higher evidence', position: 'insideTopLeft', fill: '#EF4444', fontSize: 12 }} />
            <Area type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={3} fill="url(#lineGradient)" fillOpacity={1} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
};

export default LDRChart;
