import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, MapPin, Calendar, User, ArrowLeft, Share2, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import { recentScansData, polymerDistributionData } from '../data/dummyData';

const POLYMER_COLORS = ['#0F172A','#0D9488','#2563EB','#D97706','#E11D48'];

export const ScanResults = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const sample = recentScansData[0]; // MS-000234

  const sizeData = [
    { name: '<50μm',     count: 21, fill: '#0F172A' },
    { name: '50-100μm',  count: 12, fill: '#0D9488' },
    { name: '100-500μm', count: 6,  fill: '#2563EB' },
    { name: '>500μm',    count: 3,  fill: '#D97706' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-slate-100 text-slate-700 border border-slate-200">
              SCREENING REPORT
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-mono flex items-center gap-3">
            {sample.id}
            <StatusBadge type={sample.riskLevel} text={`${sample.riskLevel.toUpperCase()} RISK`} />
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-sans">
            Low-cost visible-light screening for likely particle-like features; intended for lab confirmation, not certified identification.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" icon={Share2} onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
            {copied ? 'Link Copied!' : 'Share'}
          </Button>
          <Button variant="primary" icon={Download} onClick={() => window.print()}>
            Download Report (PDF)
          </Button>
        </div>
      </div>

      {/* Metadata cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        {[
          { Icon: MapPin,    color: 'text-teal-600',  label: 'SAMPLING LOCATION', main: sample.locationLabel, sub: sample.gps },
          { Icon: Calendar,  color: 'text-slate-700', label: 'TIMESTAMP',          main: new Date(sample.timestamp).toLocaleString('en-US', { hour12: false }), sub: sample.waterType },
          { Icon: User,      color: 'text-slate-700', label: 'OPERATOR',           main: sample.operator,  sub: sample.organization },
        ].map(({ Icon, color, label, main, sub }, idx) => (
          <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-xl hover-lift">
            <div className={`flex items-center gap-1.5 text-slate-500 text-[11px] mb-1`}>
              <Icon className={`w-3.5 h-3.5 ${color}`} />{label}
            </div>
            <div className="text-slate-900 font-bold truncate">{main}</div>
            <div className="text-[10px] text-slate-500 mt-0.5 truncate">{sub}</div>
          </div>
        ))}

        {/* Optical screening summary card */}
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl hover-lift">
          <div className="flex items-center gap-1.5 text-rose-700 text-[11px] font-bold mb-1">
            <AlertTriangle className="w-3.5 h-3.5" />OPTICAL SCREENING SUMMARY
          </div>
          <div className="text-sm font-semibold text-rose-700">
            {sample.detectionResult}
          </div>
          <div className="text-[10px] text-rose-600 mt-0.5">
            Visible-light imaging with frame-sequence comparison — results are indicative and require lab confirmation.
          </div>
        </div>
      </div>

      {/* Analysis cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card header="Approximate visible feature size range">
            <div className="text-[10px] text-slate-500 mb-2">Visible-light imaging cannot resolve sub-micron particles; these ranges are approximate for detected camera features.</div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sizeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} fontFamily="monospace" />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} fontFamily="monospace" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#E2E8F0', fontSize: '11px', fontFamily: 'monospace' }} />
                  <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                    {sizeData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card header="Screening Disclaimer & Context">
            <div className="text-xs font-mono text-slate-700 space-y-3">
              <p>This tool uses visible-light imaging, polarization, and delayed-frame comparison to flag likely particle-like features.</p>
              <p>It does not replace certified laboratory methods such as FTIR or Raman spectroscopy for polymer identification.</p>
              <p>All results are screening-level and should be validated with reference lab analysis.</p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card header="Polymer Classification">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={polymerDistributionData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="percentage">
                    {polymerDistributionData.map((_, i) => (
                      <Cell key={i} fill={POLYMER_COLORS[i % POLYMER_COLORS.length]} stroke="#F8FAFC" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#E2E8F0', fontSize: '11px', fontFamily: 'monospace' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card header="AI Diagnostics & Actions">
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Screening Likelihood:</span>
                <span className="text-emerald-700 font-bold">{sample.confidenceLabel}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Likely Composition:</span>
                <span className="text-slate-900 font-bold">{sample.dominantPolymer}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 space-y-2">
                {['Recommend certified lab confirmation with FTIR/Raman.', 'Collect follow-up samples within the same watershed.', 'Flag results for further analytical review before action.'].map((a, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] font-sans text-slate-700">
                    <span className="text-teal-600 font-bold font-mono mt-0.5">{i + 1}.</span>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScanResults;
