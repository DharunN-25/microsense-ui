import React from 'react';
import useLiveTelemetry from '../../hooks/useLiveTelemetry';

export const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const telemetry = useLiveTelemetry();

  return (
    <header className="bg-white border-b border-slate-200/70 sticky top-0 z-30 px-4 lg:px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-2xl focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden sm:flex flex-col gap-0">
            <span className="text-sm font-semibold text-slate-900">MicroSense OS</span>
            <span className="text-xs text-slate-500">Laboratory instrument console</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right text-[11px] text-slate-600">
            <span className="font-semibold">{telemetry.operatorName}</span>
            <span>{telemetry.operatorId}</span>
          </div>
          <div className="hidden sm:flex flex-col text-right text-[11px] text-slate-600">
            <span className="font-semibold">{telemetry.dateStr || '—'}</span>
            <span>{telemetry.timeStr || '—'}</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white grid place-items-center text-sm font-semibold">OP</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
