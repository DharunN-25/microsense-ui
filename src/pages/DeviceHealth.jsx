import React, { useState } from 'react';
import { 
  Battery, Zap, Camera, Navigation, Wifi, RefreshCw, 
  CheckCircle2, HardDrive, Cpu, Thermometer, Sparkles, Activity
} from 'lucide-react';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import useLiveTelemetry from '../hooks/useLiveTelemetry';
import { deviceStatusData } from '../data/dummyData';

const HW_ITEMS = [
  { name: 'Raspberry Pi Camera Module',       category: 'Optics',       detail: 'Visible-light capture · motion-tracking · auto exposure', icon: Camera,      type: 'safe' },
  { name: 'Blue LED Illumination Source',     category: 'Illumination', detail: '450 nm blue LED · glare-reduced lighting',      icon: Zap,         type: 'safe' },
  { name: 'Polarizing Filter Assembly',       category: 'Optics',       detail: 'Front lens polarizer · reflection suppression', icon: Sparkles,    type: 'safe' },
  { name: 'High-Precision GPS Receiver',     category: 'Geospatial',   detail: '3D Fix · 14 Satellites · HDOP 0.8',        icon: Navigation,  type: 'safe' },
  { name: 'Wi-Fi 6 / 5G IoT Link',           category: 'Network',      detail: 'MQTT Connected · –64 dBm · 5G Mesh',       icon: Wifi,        type: 'safe' },
  { name: 'AI Neural Fusion Engine (NPU)',   category: 'Compute',      detail: 'v3 Multi-Modal · INT8 Quantized · Ready',  icon: Cpu,         type: 'safe' },
];

const Gauge = ({ value, max, color = '#0D9488', label }) => {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="space-y-1.5 font-mono text-xs">
      <div className="flex justify-between text-slate-600">
        <span>{label}</span>
        <span className="font-bold text-slate-900">{value}{typeof value === 'number' && max === 100 ? '%' : ''}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        <div className="h-full rounded-full transition-all duration-700"
             style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
};

export const DeviceHealth = () => {
  const [calibrating, setCalibrating] = useState(false);
  const [calibSuccess, setCalibSuccess] = useState(false);
  const tel = useLiveTelemetry();

  const handleCalibrate = () => {
    setCalibrating(true);
    setTimeout(() => { setCalibrating(false); setCalibSuccess(true); }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-led-blink"></span>
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-700">ALL SYSTEMS NOMINAL</span>
            </div>
            <span className="text-slate-400 text-xs font-mono">{deviceStatusData.serialNumber}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-mono tracking-tight">
            Device Health &amp; Diagnostics
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Thermal management · Power state · Sensor calibration · Firmware {deviceStatusData.firmwareVersion}
          </p>
        </div>

        <Button variant="primary" icon={calibrating ? RefreshCw : Activity}
                disabled={calibrating} onClick={handleCalibrate}
                className={calibrating ? 'animate-pulse' : ''}>
          {calibrating ? 'Running Calibration...' : 'Run Auto-Calibration'}
        </Button>
      </div>

      {calibSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between font-mono text-xs text-emerald-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Dark-current baseline, illumination alignment & optical axis calibration completed successfully.
          </div>
          <button onClick={() => setCalibSuccess(false)} className="text-slate-500 hover:text-slate-900 ml-4">✕</button>
        </div>
      )}

      {/* Live Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        {[
          { Icon: Battery,     label: 'BATTERY',       val: `${tel.batteryLevel}%`,   sub: '11.8V · Li-Ion',     dotColor: 'bg-emerald-500' },
          { Icon: Thermometer, label: 'TEMPERATURE',   val: `${tel.temperature}°C`,   sub: 'Optimal (<30°C)',    dotColor: tel.temperature > 26 ? 'bg-amber-500' : 'bg-emerald-500' },
          { Icon: HardDrive,   label: 'STORAGE',       val: '22%',                    sub: '49.8 GB free',       dotColor: 'bg-slate-500' },
          { Icon: Cpu,         label: 'NPU LOAD',      val: `${tel.cpuUsage}%`,       sub: 'Idle state',         dotColor: tel.cpuUsage > 25 ? 'bg-amber-500' : 'bg-emerald-500' },
        ].map(({ Icon, label, val, sub, dotColor }, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 hover-lift">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[10px] uppercase tracking-wider">{label}</span>
              <Icon className="w-4 h-4" />
            </div>
            <div className="text-xl font-bold text-slate-900">{val}</div>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-500">
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-led-blink`}></span>
              {sub}
            </div>
          </div>
        ))}
      </div>

      {/* Hardware gauge row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card header="System Performance Gauges">
          <div className="space-y-4">
            <Gauge label="Battery Level" value={tel.batteryLevel} max={100} color="#16A34A" />
            <Gauge label="NPU / CPU Load" value={tel.cpuUsage} max={100} color="#0D9488" />
            <Gauge label="Core Temperature Δ" value={Math.round((tel.temperature / 40) * 100)} max={100} color={tel.temperature > 28 ? '#D97706' : '#2563EB'} />
            <Gauge label="Storage Used" value={22} max={100} color="#64748B" />
          </div>
        </Card>

        <Card header="Instrument Serial & Firmware">
          <div className="space-y-2 font-mono text-xs">
            {[
              ['Serial Number', deviceStatusData.serialNumber],
              ['Firmware Build', deviceStatusData.firmwareVersion],
              ['Instrument OS', 'MicroSense OS 2.4 (PROD)'],
              ['AI Model', 'Multi-Modal Neural Fusion v3 — INT8'],
              ['Illumination Calibration', '2026-08-06 — Valid'],
              ['Optical Calibration', '2026-08-06 — Valid'],
              ['Last Sync', `${tel.lastSyncSecs}s ago`],
              ['Uptime', tel.formattedUptime],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0">
                <span className="text-slate-500">{k}</span>
                <span className="text-slate-900 font-bold">{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Component Status Matrix */}
      <Card header="Sensor Module Status Matrix">
        <div className="space-y-2.5 font-mono text-xs">
          {HW_ITEMS.map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between hover-lift">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{comp.name}</div>
                    <div className="text-[10px] text-slate-500 font-sans">{comp.detail}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <span className="text-[10px] text-slate-400 hidden sm:block font-mono uppercase">{comp.category}</span>
                  <StatusBadge type={comp.type} text="NOMINAL" />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default DeviceHealth;
