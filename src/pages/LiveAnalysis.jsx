import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, CheckCircle2, Zap, Sparkles, Activity, RefreshCw } from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Cell
} from 'recharts';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import MicroscopeViewer from '../components/microscope/MicroscopeViewer';

/* ── Animated Optical Waveform SVG ── */
const OpticalWaveform = ({ color1 = '#0F172A', color2 = '#0D9488', paused }) => {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef();
  useEffect(() => {
    if (paused) return;
    const step = () => { setOffset(o => (o + 1.5) % 200); rafRef.current = requestAnimationFrame(step); };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  const buildPath = (amp, freq, phase) => {
    const pts = Array.from({ length: 601 }, (_, i) => {
      const x = i * (300 / 600);
      const y = 30 + amp * Math.sin((i / freq) * Math.PI * 2 + phase);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    });
    return pts.join(' ');
  };

  return (
    <svg viewBox="0 0 300 60" className="w-full h-full" preserveAspectRatio="none">
      <path d={buildPath(14, 18, offset * 0.06)} stroke={color1} strokeWidth="1.5" fill="none" opacity="0.85" />
      <path d={buildPath(10, 14, offset * 0.06 + 1.2)} stroke={color2} strokeWidth="1.5" fill="none" opacity="0.85" />
    </svg>
  );
};

const SIZE_DATA = [
  { range: '<50μm',    count: 16, fill: '#0F172A' },
  { range: '50-100μm', count: 11, fill: '#0D9488' },
  { range: '100-500μm',count: 5,  fill: '#2563EB' },
  { range: '>500μm',   count: 2,  fill: '#D97706' },
];

export const LiveAnalysis = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(68);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsed, setElapsed] = useState(84);
  const [features, setFeatures] = useState(34);
  const [confidence, setConfidence] = useState(74);
  const [blueLedActive, setBlueLedActive] = useState(true);
  const [illuminationActive, setIlluminationActive] = useState(true);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      setElapsed(p => p + 1);
      setProgress(p => Math.min(100, p + 0.4));
      if (Math.random() > 0.6) setFeatures(f => f + (Math.random() > 0.5 ? 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [isPaused]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <StatusBadge type={isPaused ? 'warning' : 'rose'} text={isPaused ? 'PAUSED' : 'SCAN IN PROGRESS'} pulse={!isPaused} />
            <span className="text-slate-500 text-xs font-mono">ID: MS-000240 · LIVE SESSION</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-mono">Live Spectro-Optical Studio</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-sans">
            Stage 4 of 6 · Visible scatter imaging with 450 nm Blue LED illumination
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-right">
            <div className="text-[10px] text-slate-400">ELAPSED</div>
            <div className="text-slate-900 font-bold">{fmt(elapsed)} / 02:15</div>
          </div>
          <Button variant="secondary" icon={isPaused ? Play : Pause} onClick={() => setIsPaused(v => !v)}>
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button variant="primary" icon={CheckCircle2} onClick={() => navigate('/results')}>
            View Results
          </Button>
        </div>
      </div>

      {/* Animated progress bar */}
      <Card>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium">Stage 4: Visible scatter imaging & Blue LED illumination</span>
            <span className="text-slate-900 font-bold">{Math.round(progress)}% COMPLETE</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%`, background: 'linear-gradient(to right, #0D9488, #0F172A)' }}
            />
          </div>
          <div className="flex gap-4 pt-0.5">
            {[
              { label: 'Sample Collection', done: true },
              { label: 'Filtration',         done: true },
              { label: 'Optical Imaging',    done: true },
              { label: 'Scatter Imaging',    done: false, active: true },
              { label: 'Blue LED Imaging',   done: false },
              { label: 'AI Fusion',          done: false },
            ].map((s, idx) => (
              <div key={idx} className="flex items-center gap-1 text-[10px]">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  s.active ? 'bg-teal-600 animate-led-blink' :
                  s.done   ? 'bg-emerald-500' : 'bg-slate-300'
                }`} />
                <span className={s.done || s.active ? 'text-slate-700' : 'text-slate-400'}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Microscope + sensors */}
        <div className="lg:col-span-2 space-y-6">
          <Card header="Live Optical Viewport — Raspberry Pi Camera Module">
            <MicroscopeViewer isScanning={!isPaused} blueLedActive={blueLedActive} illuminationActive={illuminationActive} />
          </Card>

          {/* Dual sensor row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Optical Waveform Visualization */}
            <Card header="Scatter Imaging — 450 nm Blue LED"
                  action={<StatusBadge type={illuminationActive ? 'teal' : 'warning'} text={illuminationActive ? 'IMAGING ACTIVE' : 'OFF'} pulse={illuminationActive} />}>
              <div className="h-16 w-full my-2">
                <OpticalWaveform color1="#0F172A" color2="#0D9488" paused={isPaused} />
              </div>
              <div className="space-y-2 mt-1 font-mono text-[11px]">
                {[
                  { label: 'Illumination Peak', value: '450 nm', bar: 100, color: '#0D9488' },
                  { label: 'Contrast Gain', value: '82%', bar: 82, color: '#0F172A' },
                  { label: 'Polarizer Efficiency', value: '78%', bar: 78, color: '#D97706' },
                ].map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-slate-700 mb-0.5">
                      <span>{m.label}</span><span className="font-bold text-slate-900">{m.value}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                           style={{ width: `${m.bar}%`, backgroundColor: m.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono text-slate-500">Illumination module:</span>
                <button
                  onClick={() => setIlluminationActive(v => !v)}
                  className={`px-2.5 py-1 text-xs rounded font-mono font-bold transition-colors ${illuminationActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 border border-slate-300'}`}
                >
                  {illuminationActive ? 'ACTIVE' : 'OFF'}
                </button>
              </div>
            </Card>

            {/* Blue LED Imaging */}
            <Card header="Blue LED Illumination — 450 nm"
                  action={<StatusBadge type={blueLedActive ? 'teal' : 'warning'} text={blueLedActive ? 'BLUE LED ACTIVE' : 'OFF'} pulse={blueLedActive} />}>
              <div className="space-y-2 mt-1 font-mono text-[11px]">
                {[
                  { label: 'Excitation Peak', value: '365 nm', bar: 85, color: '#0D9488' },
                  { label: 'Emission Peak', value: '465 nm (Polymer)', bar: 92, color: '#0F172A' },
                  { label: 'Organic Ratio', value: '< 4.2%', bar: 14, color: '#D97706' },
                ].map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-slate-700 mb-0.5">
                      <span>{m.label}</span><span className="font-bold text-slate-900">{m.value}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                           style={{ width: `${m.bar}%`, backgroundColor: m.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono text-slate-500">Blue LED module:</span>
                <button
                  onClick={() => setBlueLedActive(v => !v)}
                  className={`px-2.5 py-1 text-xs rounded font-mono font-bold transition-colors ${blueLedActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 border border-slate-300'}`}
                >
                  {blueLedActive ? 'ACTIVE' : 'OFF'}
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Live AI Readout column */}
        <div className="space-y-6">
          <Card header="AI Fusion Readout" highlight>
            <div className="space-y-4">
              {/* Feature indicator */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">Visible feature score</span>
                <div className="text-3xl font-bold text-slate-900 font-mono">
                  ~{features} <span className="text-xs text-slate-400 font-normal">screen units</span>
                </div>
                {features > 25 && (
                  <div className="mt-2 inline-block px-2.5 py-0.5 rounded text-[10px] font-mono bg-rose-50 text-rose-700 border border-rose-200">
                    Higher visible-screening indication
                  </div>
                )}
              </div>

              {/* Confidence meter */}
              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Screening Score</span>
                  <span className="font-bold text-emerald-700">{confidence}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all duration-700"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>

              {/* Size histogram */}
              <div>
                <div className="text-[10px] font-mono text-slate-500 mb-1 uppercase">Visual Feature Size Range</div>
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SIZE_DATA} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                      <XAxis dataKey="range" stroke="#94A3B8" fontSize={9} tickLine={false} fontFamily="monospace" />
                      <YAxis stroke="#94A3B8" fontSize={9} tickLine={false} fontFamily="monospace" />
                      <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                        {SIZE_DATA.map((e, i) => <Cell key={i} fill={e.fill} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Module flow lines (SVG data transfer visual) */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-[9px] font-mono text-slate-400 uppercase mb-2">Sensor Data Pipeline</div>
                <svg viewBox="0 0 200 28" className="w-full h-7">
                  {/* nodes */}
                  {['CAM','LSR','LED','AI'].map((lbl, i) => (
                    <g key={lbl}>
                      <rect x={i * 52 + 2} y="6" width="38" height="16" rx="3"
                            fill={i === 3 ? '#0F172A' : '#F1F5F9'} stroke="#CBD5E1" strokeWidth="0.8" />
                      <text x={i * 52 + 21} y="17" textAnchor="middle" fill={i === 3 ? '#fff' : '#475569'}
                            fontFamily="monospace" fontSize="7" fontWeight="bold">{lbl}</text>
                    </g>
                  ))}
                  {/* flowing connector lines */}
                  {[0, 1, 2].map(i => (
                    <line key={i} x1={i * 52 + 40} y1="14" x2={i * 52 + 54} y2="14"
                          stroke="#0D9488" strokeWidth="1.2" strokeDasharray="4 3"
                          className="animate-flow-dash" />
                  ))}
                </svg>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveAnalysis;
