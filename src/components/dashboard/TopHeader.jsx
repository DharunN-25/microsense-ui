import React from 'react';
import { Play } from 'lucide-react';
import Button from '../common/Button';

const TopHeader = ({ instrumentId, operatorName, currentDateTime, scanLocation, scanCoordinates, onStart }) => {
  return (
    <section className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm animate-fade-up">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Instrument Overview</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">MicroSense Laboratory Instrument</h1>
        </div>

        <div className="flex-shrink-0">
          <Button variant="primary" icon={Play} onClick={onStart} className="whitespace-nowrap">
            Start New Scan
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Instrument ID</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">{instrumentId}</p>
        </div>
        <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Operator</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">{operatorName}</p>
        </div>
        <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Date</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">{currentDateTime.date}</p>
        </div>
        <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Time</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">{currentDateTime.time}</p>
        </div>
        <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Scan Location</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">{scanLocation || 'Unknown'}</p>
          <p className="mt-1 text-[11px] text-slate-500">{scanCoordinates || 'No GPS data'}</p>
        </div>
      </div>
    </section>
  );
};

export default TopHeader;
