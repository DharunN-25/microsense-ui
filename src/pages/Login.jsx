import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Microscope, ArrowRight, Cpu, Building2 } from 'lucide-react';
import Button from '../components/common/Button';
import ParticleBackground from '../components/common/ParticleBackground';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 bg-grid-subtle relative">
      <ParticleBackground />

      <div className="w-full max-w-sm space-y-6 relative z-10">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white mx-auto shadow-sm relative">
            <Microscope className="w-6 h-6" />
            {/* pulsing ring */}
            <span className="absolute inset-0 rounded-xl border border-slate-900/20 animate-ripple pointer-events-none" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-mono tracking-tight">MICROSENSE OS</h1>
          <p className="text-xs text-slate-500 font-mono">Visible-Light Screening Workstation · SIH 2026</p>
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-led-blink"></span>
            Instrument MS-LAB-2026-X99 · Online
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 font-mono text-xs hover-lift">
          <div className="text-slate-400 font-semibold uppercase text-[10px] pb-2 border-b border-slate-100">
            Operator Authentication Portal
          </div>

          <form onSubmit={e => { e.preventDefault(); navigate('/'); }} className="space-y-3">
            <div>
              <label className="block text-slate-500 mb-1">Operator ID</label>
              <input type="text" defaultValue="OP-001"
                className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-900 transition-colors" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Organization</label>
              <input type="text" defaultValue="Environmental Monitoring Unit"
                className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-900 transition-colors" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Instrument Serial</label>
              <input type="text" defaultValue="MS-LAB-2026-X99"
                className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-900 transition-colors" />
            </div>

            <Button type="submit" variant="primary" icon={ArrowRight} className="w-full py-2.5 font-bold">
              Access Workstation
            </Button>
          </form>

          <div className="pt-2 text-center border-t border-slate-100">
            <button onClick={() => navigate('/')} className="text-[11px] text-slate-500 hover:text-slate-900 font-mono underline transition-colors">
              Evaluator Demo Access →
            </button>
          </div>
        </div>

        <div className="text-center text-[10px] font-mono text-slate-400">
          Smart India Hackathon 2026 · Environmental Monitoring Unit
        </div>
      </div>
    </div>
  );
};

export default Login;
