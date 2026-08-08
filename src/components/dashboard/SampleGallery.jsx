import React from 'react';
import StatusBadge from '../common/StatusBadge';

const SampleGallery = ({ items }) => {
  return (
    <article className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm animate-fade-up">
      <div className="mb-5">
        <p className="text-sm font-semibold text-slate-900">Captured Sample Evidence</p>
        <p className="mt-1 text-sm text-slate-500">Latest microscope captures from the instrument camera.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        {items.slice(0, 4).map((item) => (
          <div key={item.id} className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_16px_32px_-22px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.14)]">
            <div className="bg-slate-100 rounded-t-[20px] overflow-hidden">
              <div className="grid grid-cols-3 gap-1">
                {item.imageSequence.slice(0, 3).map((img, idx) => (
                  <img key={idx} src={img} alt={`${item.id}-frame-${idx + 1}`} className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ))}
              </div>
              <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500">
                Sequence of recent frames from the latest scan.
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{item.id}</p>
                  <p className="mt-1 text-[13px] text-slate-500">{item.date} · {item.time}</p>
                </div>
                <StatusBadge type={item.statusType} text={item.statusLabel} size="sm" />
              </div>
              <div className="mt-4 text-sm text-slate-500">
                <span className="font-semibold text-slate-900">{item.resultText}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default SampleGallery;
