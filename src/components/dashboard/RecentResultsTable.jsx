import React from 'react';
import { MapPin } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const formatTime = (timestamp) => {
  try {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  } catch {
    return timestamp;
  }
};

const RecentResultsTable = ({ readings }) => {
  return (
    <article className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm animate-fade-up">
      <div className="mb-5">
        <p className="text-sm font-semibold text-slate-900">Recent Scan Results</p>
        <p className="mt-1 text-sm text-slate-500">Frame-sequence screening with GPS tagging and probabilistic ML scoring.</p>
      </div>
      <div className="overflow-hidden rounded-[20px] border border-slate-100 min-w-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-[11px] uppercase tracking-[0.18em]">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Detection Result</th>
                <th className="px-4 py-3">Likelihood</th>
                <th className="px-4 py-3">Model Confidence</th>
                <th className="px-4 py-3">Map</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {readings.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-slate-100 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100`}
                >
                  <td className="px-4 py-5 align-middle text-slate-900">{formatTime(row.timestamp)}</td>
                  <td className="px-4 py-5 align-middle text-slate-900">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-600" />
                      <span>{row.locationLabel}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">{row.gps}</div>
                  </td>
                  <td className="px-4 py-5 align-middle font-semibold text-slate-900">{row.detectionResult}</td>
                  <td className="px-4 py-5 align-middle">
                    <StatusBadge type={row.riskColor} text={row.detectionLikelihood} size="sm" />
                  </td>
                  <td className="px-4 py-5 align-middle text-slate-900">{row.confidenceLabel}</td>
                  <td className="px-4 py-5 align-middle text-slate-900">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${row.location.lat},${row.location.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-600 hover:text-teal-700 text-xs font-semibold"
                    >
                      View on Map
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
};

export default RecentResultsTable;
