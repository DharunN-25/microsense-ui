import React, { useState } from 'react';
import { Save, Sliders, Wifi, User, Cpu, CheckCircle2 } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const [thresholds, setThresholds] = useState({ safeLimit: 5, moderateLimit: 25, criticalLimit: 50 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-slate-100 text-slate-700 border border-slate-200">
              SYSTEM PREFERENCES
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-mono tracking-tight">
            Instrument Configuration
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Manage agency metadata, safety threshold limits, AI sensor weights, and telemetry links.
          </p>
        </div>

        <Button variant="primary" icon={Save} onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
          {saved ? 'Saved Preferences!' : 'Save Changes'}
        </Button>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 font-mono text-xs text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Instrument parameters written to persistent EEPROM memory.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 font-mono text-xs overflow-x-auto">
        <button onClick={() => setActiveTab('general')} className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'general' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`}>
          Agency & Operator
        </button>
        <button onClick={() => setActiveTab('thresholds')} className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'thresholds' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`}>
          Safety Thresholds
        </button>
        <button onClick={() => setActiveTab('ai')} className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'ai' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`}>
          AI Fusion Weights
        </button>
      </div>

      {activeTab === 'general' && (
        <Card header="Agency & Laboratory Metadata">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <label className="block text-slate-500 mb-1">Ministry / Agency</label>
              <input type="text" defaultValue="MoEFCC / Central Water Board" className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Lead Operator</label>
              <input type="text" defaultValue="Lab Operator (OP-001)" className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900" />
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'thresholds' && (
        <Card header="Visible Screening Thresholds">
          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-700 mb-1"><span>Approximate alert threshold:</span><span className="font-bold text-emerald-700">&lt; {thresholds.safeLimit} screen units</span></div>
              <input type="range" min="1" max="10" value={thresholds.safeLimit} onChange={(e) => setThresholds({ ...thresholds, safeLimit: parseInt(e.target.value) })} className="w-full accent-slate-900" />
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'ai' && (
        <Card header="AI Multi-Modal Fusion Precision">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-700">
            Optics: 40% | Scattering: 35% | Blue LED Imaging: 25%
          </div>
        </Card>
      )}
    </div>
  );
};

export default Settings;
