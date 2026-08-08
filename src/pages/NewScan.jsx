import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Droplet, Filter, Camera, Zap, Sparkles, Cpu, CheckCircle2, 
  Play, MapPin, Clock 
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';

const STEPS = [
  { id: 1, title: 'Sample Collection', sub: 'GPS + Water Metadata', icon: Droplet },
  { id: 2, title: 'Sample Preparation', sub: '10 μm PTFE Micro-mesh', icon: Filter },
  { id: 3, title: 'Optical Imaging', sub: 'Raspberry Pi Camera Module', icon: Camera },
  { id: 4, title: 'Scatter Imaging', sub: '450 nm blue LED + polarizer', icon: Zap },
  { id: 5, title: 'Blue LED Imaging', sub: '450 nm blue LED + polarizer', icon: Sparkles },
  { id: 6, title: 'AI Sensor Fusion', sub: 'Multi-Modal Classifier v3', icon: Cpu },
  { id: 7, title: 'Results Synthesis', sub: 'EPA Compliance Report', icon: CheckCircle2 },
];

const WATER_SOURCES = [
  'Cauvery River — Grand Anicut',
  'Adyar River — Kotturpuram Estuary',
  'Cooum River — Chetpet Reserve',
  'Palar River — Kanchipuram Basin',
  'Marina Coastal Station B',
  'Chembarambakkam Lake — Intake Tower',
];

const WATER_TYPES = ['River Water', 'Lake Water', 'Drinking Water', 'Groundwater', 'Industrial Discharge'];
const VOLUMES = ['100 mL (Field Rapid)', '250 mL (Standard EPA)', '500 mL (High Accuracy)', '1000 mL (Trace Benchmark)'];

export const NewScan = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preset, setPreset] = useState('standard');
  const [cfg, setCfg] = useState({
    location: WATER_SOURCES[0],
    waterType: WATER_TYPES[0],
    volume: VOLUMES[1],
    gps: '10.8350° N, 78.8183° E',
  });

  const PRESETS = [
    { key: 'field',    label: 'Field Rapid',    time: '45 s' },
    { key: 'standard', label: 'Standard EPA',   time: '2 m 15 s' },
    { key: 'research', label: 'Research Deep',  time: '5 m 00 s' },
  ];

  const preETA = PRESETS.find(p => p.key === preset)?.time || '—';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-slate-100 text-slate-700 border border-slate-200">
              INSTRUMENT WORKFLOW
            </span>
            <span className="text-slate-400 text-xs font-mono">| EPA Standard Protocol</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-mono">New Water Screening Session</h1>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Configure sample parameters, verify hardware readiness, and launch the 7-stage visible-light screening sequence.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 font-mono text-xs">
          {PRESETS.map(p => (
            <button key={p.key} onClick={() => setPreset(p.key)}
              className={`px-3 py-1.5 rounded transition-colors ${preset === p.key ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}>
              {p.label} ({p.time})
            </button>
          ))}
        </div>
      </div>

      {/* Workflow Stepper */}
      <Card header="7-Stage Instrument Protocol Stepper">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {STEPS.map(s => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} onClick={() => setStep(s.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover-lift flex flex-col ${
                  isActive ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : isDone  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-slate-300' : isDone ? 'text-emerald-600' : 'text-slate-400'}`}>0{s.id}</span>
                  {isDone
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    : <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-teal-400 animate-led-blink' : 'bg-slate-300'}`} />
                  }
                </div>
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-xs font-bold font-mono truncate">{s.title}</span>
                <span className={`text-[9px] font-sans truncate mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>{s.sub}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Stage detail + launch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          header={`Stage 0${step} — ${STEPS[step - 1].title}`}
          action={
            <div className="flex gap-2">
              <button disabled={step === 1} onClick={() => setStep(p => p - 1)}
                className="px-2.5 py-1 text-xs font-mono bg-slate-100 border border-slate-200 rounded disabled:opacity-30 hover:bg-slate-200 transition-colors">
                Prev
              </button>
              <button disabled={step === 7} onClick={() => setStep(p => p + 1)}
                className="px-2.5 py-1 text-xs font-mono bg-slate-900 text-white rounded disabled:opacity-30 hover:bg-slate-700 transition-colors font-bold">
                Next
              </button>
            </div>
          }
          className="lg:col-span-2">
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-slate-500 mb-1">Sampling Location</label>
                <select value={cfg.location} onChange={e => setCfg({ ...cfg, location: e.target.value, gps: '10.8350° N, 78.8183° E' })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-900">
                  {WATER_SOURCES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 mb-1">GPS Coordinates</label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-800">
                  <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-[11px]">{cfg.gps}</span>
                </div>
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Water Category</label>
                <select value={cfg.waterType} onChange={e => setCfg({ ...cfg, waterType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-900">
                  {WATER_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Sample Volume</label>
                <select value={cfg.volume} onChange={e => setCfg({ ...cfg, volume: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-900">
                  {VOLUMES.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
          )}
          {step > 1 && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono space-y-1">
              <div className="text-slate-900 font-bold mb-1">Stage {step} Parameters Ready</div>
              <div className="text-slate-600">Location: {cfg.location}</div>
              <div className="text-slate-600">Water type: {cfg.waterType}</div>
              <div className="text-slate-600">Volume: {cfg.volume}</div>
            </div>
          )}
        </Card>

        {/* Launch panel */}
        <Card header="Instrument Studio Launch">
          <div className="space-y-4 font-mono text-xs">
            {/* Pre-scan checklist */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
              {[
                ['Fluidic Pump', 'Primed'],
                ['Optics Lens', 'Auto-focused'],
                ['Polarizing Filter', 'Engaged'],
                ['450 nm Blue LED', 'Ready'],
                ['GPS Fix', '3D Lock (14 Sat)'],
              ].map(([lbl, val]) => (
                <div key={lbl} className="flex justify-between text-slate-700">
                  <span>{lbl}:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-led-blink"></span>
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-700 flex-shrink-0" />
              <div>
                <div className="text-teal-700 font-bold">ETA: {preETA}</div>
                <div className="text-[10px] text-slate-600">Live telemetry streamed to studio in real-time</div>
              </div>
            </div>

            <Button variant="primary" size="lg" icon={Play}
              onClick={() => navigate('/live-analysis')}
              className="w-full py-3 font-bold">
              Execute Live Analysis
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NewScan;
