import React, { useState, useEffect } from 'react';
import { Eye, Sparkles, RefreshCw } from 'lucide-react';

const PARTICLES = [
  { id: 1, x: 22, y: 32, size: 44, type: 'Likely particle-like feature', likelihood: 'Moderate' },
  { id: 2, x: 66, y: 51, size: 19, type: 'Likely particle-like feature', likelihood: 'Moderate' },
  { id: 3, x: 43, y: 70, size: 110, type: 'Likely particle-like feature', likelihood: 'High' },
  { id: 4, x: 78, y: 24, size: 34, type: 'Likely particle-like feature', likelihood: 'Moderate' },
  { id: 5, x: 14, y: 62, size: 26, type: 'Likely particle-like feature', likelihood: 'Low' },
];

export const MicroscopeViewer = ({ isScanning = true, blueLedActive = false, illuminationActive = true }) => {
  const [zoom, setZoom] = useState(400);
  const [mode, setMode] = useState('darkfield');
  const [particles, setParticles] = useState(PARTICLES);
  const [scanRingAngle, setScanRingAngle] = useState(0);

  /* ── Micro-motion simulation ── */
  useEffect(() => {
    if (!isScanning) return;
    const t = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: Math.max(10, Math.min(88, p.x + (Math.random() - 0.5) * 1.2)),
        y: Math.max(10, Math.min(88, p.y + (Math.random() - 0.5) * 1.2)),
      })));
    }, 1400);
    return () => clearInterval(t);
  }, [isScanning]);

  /* ── Rotating ring angle counter (CSS handles it, but kept for future use) ── */
  useEffect(() => {
    const t = setInterval(() => setScanRingAngle(a => (a + 1) % 360), 80);
    return () => clearInterval(t);
  }, []);

  const bgColor =
    mode === 'darkfield'   ? '#0B1120' :
    mode === 'timelapse'   ? '#06141b' : '#CBD5E1';

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-300 shadow-sm"
         style={{ backgroundColor: bgColor }}>

      {/* ── Optical Reticle Grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-15"
           style={{
             backgroundImage: [
               'radial-gradient(circle at 50% 50%, rgba(20,184,166,0.12) 0%, transparent 60%)',
               'linear-gradient(0deg, transparent 49.5%, rgba(255,255,255,0.15) 50%, transparent 50.5%)',
               'linear-gradient(90deg, transparent 49.5%, rgba(255,255,255,0.15) 50%, transparent 50.5%)',
             ].join(','),
             backgroundSize: '100% 100%, 32px 32px, 32px 32px',
           }} />

      {/* ── Scanning Line ── */}
      {isScanning && <div className="animate-scanline" />}

      {/* ── Rotating Optical Ring ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-52 h-52 rounded-full border border-teal-500/20 flex items-center justify-center">
          {/* outer spinning dashed ring */}
          <div className="w-44 h-44 rounded-full border border-dashed border-teal-400/30 animate-spin-slow" />
        </div>
        {/* inner cross-hair */}
        <div className="absolute w-3 h-3 flex items-center justify-center">
          <div className="w-full h-px bg-teal-400/50"></div>
          <div className="h-full w-px bg-teal-400/50 absolute"></div>
        </div>
      </div>

      {/* ── Illumination Glow Spot ── */}
      {illuminationActive && (
        <div className="absolute pointer-events-none w-20 h-20 rounded-full blur-xl bg-teal-400/10 animate-ripple"
             style={{ left: '44%', top: '38%' }} />
      )}

      {/* ── Blue LED illumination overlay ── */}
      {blueLedActive && <div className="absolute inset-0 bg-blue-900/10 pointer-events-none animate-pulse" />}

      {/* ── Detected Particles ── */}
      {particles.map(p => (
        <div key={p.id}
             className="absolute transition-all duration-[700ms] ease-out cursor-pointer group z-10"
             style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <div className={`rounded-full transition-transform group-hover:scale-125
                          ${mode === 'timelapse' ? 'bg-teal-300' : 'bg-teal-400'}`}
               style={{ width: Math.max(6, p.size / 5), height: Math.max(6, p.size / 5) }} />

          {/* Bounding-box HUD label */}
          <div className="absolute -top-7 -left-6 border border-slate-600 rounded px-1.5 py-0.5
                          w-28 bg-slate-900/90 text-[9px] font-mono text-white
                          pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="flex justify-between text-teal-300 font-bold">
              <span>#F-0{p.id}</span>
              <span className="text-emerald-400">{p.likelihood}</span>
            </div>
            <div className="text-slate-300 truncate">{p.type}</div>
          </div>
        </div>
      ))}

      {/* ── Top Controls Overlay ── */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-900/90 text-white border border-slate-700 flex items-center gap-1.5 backdrop-blur-xs">
            <Eye className="w-3.5 h-3.5 text-teal-400" />
            OPTICS · Raspberry Pi Camera Module
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-900/90 text-teal-300 border border-teal-500/40 font-bold backdrop-blur-xs">
            {zoom}× MAG
          </span>
          {blueLedActive && (
            <span className="px-2 py-1 rounded bg-blue-900/90 text-blue-200 border border-blue-500/40 font-bold text-[10px] backdrop-blur-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Blue LED 450nm
            </span>
          )}
        </div>

        {/* Filter mode buttons */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-md border border-slate-700 backdrop-blur-xs">
          {['darkfield','timelapse','brightfield'].map(m => (
            <button key={m}
                    onClick={() => setMode(m)}
                    className={`px-2.5 py-0.5 text-[11px] font-mono rounded capitalize transition-colors
                               ${mode === m ? (m === 'timelapse' ? 'bg-teal-600 text-white font-bold' : 'bg-white text-slate-900 font-bold') : 'text-slate-400 hover:text-white'}`}>
              {m === 'timelapse' ? 'Time-lapse' : m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Bottom Status Bar ── */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between
                      bg-slate-900/90 px-3 py-1.5 rounded-md border border-slate-800 backdrop-blur-xs font-mono text-xs text-slate-300">
        <div className="flex items-center gap-4 text-[11px]">
          <span>FPS: <span className="text-emerald-400 font-bold">60.0</span></span>
          <span>DETECTED: <span className="text-teal-400 font-bold">{particles.length} Features</span></span>
          {isScanning && <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin text-teal-400" /> Scanning…</span>}
        </div>

        {/* Mag buttons */}
        <div className="flex items-center gap-1 text-[10px]">
          <span className="text-slate-400 mr-1">SCALE:</span>
          {[100, 400, 1000].map(z => (
            <button key={z} onClick={() => setZoom(z)}
                    className={`px-2 py-0.5 rounded ${zoom === z ? 'bg-white text-slate-900 font-bold' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
              {z}×
            </button>
          ))}
        </div>

        {/* Scale bar */}
        <div className="relative w-10 h-0.5 bg-teal-400 rounded">
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] text-teal-300 font-bold whitespace-nowrap">50 μm</span>
        </div>
      </div>
    </div>
  );
};

export default MicroscopeViewer;
