import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  Globe, 
  ArrowUpRight
} from 'lucide-react';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import { recentScansData } from '../data/dummyData';

export const PollutionMap = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState(recentScansData[0]);

  const mapStations = [
    ...recentScansData,
    {
      id: "MS-2026-8906",
      location: "Hooghly River Estuary, Kolkata",
      gps: "22.5726° N, 88.3639° E",
      waterType: "Surface River Water",
      dateTime: "2026-08-05 09:12:00",
      particleCount: 38,
      confidence: 72,
      confidenceLabel: "Moderate",
      detectionResult: "Likely visible feature presence",
      detectionLikelihood: "Likely",
      riskLevel: "Critical",
      dominantPolymer: "PET / PE Blend",
      operator: "Lab Operator (EMU)",
      lat: 22.5726,
      lng: 88.3639
    },
    {
      id: "MS-2026-8907",
      location: "Chilika Lake Sanctuary, Odisha",
      gps: "19.6700° N, 85.3200° E",
      waterType: "Urban Inland Lake",
      dateTime: "2026-08-04 15:30:10",
      particleCount: 4,
      confidence: 62,
      confidenceLabel: "Low",
      detectionResult: "No significant visible features detected",
      detectionLikelihood: "Unlikely",
      riskLevel: "Safe",
      dominantPolymer: "Trace Fibers",
      operator: "Lab Operator (EMU)",
      lat: 19.6700,
      lng: 85.3200
    }
  ];

  const stationsWithCoords = mapStations.map((st, idx) => ({
    ...st,
    topPercent: st.lat ? Math.max(15, Math.min(85, 100 - ((st.lat - 8) / 28) * 100)) : 50 + (idx * 12),
    leftPercent: st.lng ? Math.max(15, Math.min(85, ((st.lng - 68) / 24) * 100)) : 40 + (idx * 12),
  }));

  const filteredStations = stationsWithCoords.filter(st => {
    const matchesSearch = st.location.toLowerCase().includes(searchQuery.toLowerCase()) || st.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'All' || st.riskLevel === riskFilter;
    const matchesType = selectedFilter === 'All' || st.waterType === selectedFilter;
    return matchesSearch && matchesRisk && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-slate-100 text-slate-700 border border-slate-200">
              NATIONAL GIS TELEMETRY
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-mono tracking-tight">
            Water Quality Screening Hotspot Map
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-sans">
            Geospatial overview of visible-light screening flags across rivers, lakes, and municipal water supplies.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-700">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span>Safe (&lt;5/L)</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span>Moderate (5-25/L)</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span><span>Severe (&gt;25/L)</span></div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search location or station ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-900"
          />
        </div>

        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900"
        >
          <option value="All">All Contamination Risk Levels</option>
          <option value="Safe">Safe (&lt; 5 particles/L)</option>
          <option value="Moderate">Moderate Risk (5 - 25/L)</option>
          <option value="Critical">Critical Hazard (&gt; 25/L)</option>
        </select>

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900"
        >
          <option value="All">All Water Sources</option>
          <option value="Surface River Water">Surface River Water</option>
          <option value="Urban Inland Lake">Urban Inland Lake</option>
          <option value="Treated Potable Tap Water">Treated Potable Tap Water</option>
        </select>
      </div>

      {/* Map + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative aspect-[4/3] bg-slate-900 rounded-xl border border-slate-300 overflow-hidden shadow-xs flex flex-col justify-between">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '25px 25px'
            }}
          />

          <div className="absolute top-3 left-3 z-10 font-mono text-xs text-white bg-slate-900/90 px-3 py-1 rounded border border-slate-700 backdrop-blur-xs flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span>GIS MAP CANVAS ({filteredStations.length} STATIONS)</span>
          </div>

          <div className="absolute inset-0 p-8">
            {filteredStations.map((station) => {
              const isSelected = selectedStation?.id === station.id;
              let pinBg = 'bg-emerald-500';
              if (station.riskLevel === 'Moderate') pinBg = 'bg-amber-500';
              if (station.riskLevel === 'Critical' || station.riskLevel === 'High') pinBg = 'bg-rose-600';

              return (
                <div
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group transition-all z-20"
                  style={{ top: `${station.topPercent}%`, left: `${station.leftPercent}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className={`w-3.5 h-3.5 rounded-full ${pinBg} border-2 border-white shadow-xs group-hover:scale-125 transition-transform`}></span>
                    {isSelected && <span className="absolute w-7 h-7 rounded-full border-2 border-white animate-ping opacity-60"></span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Card header="Station Details">
          {selectedStation ? (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{selectedStation.id}</span>
                <StatusBadge type={selectedStation.riskLevel} text={selectedStation.riskLevel} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-sans">{selectedStation.location}</h3>
              <p className="text-[11px] text-teal-700">{selectedStation.gps}</p>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-slate-700">
                <div className="flex justify-between"><span>Screening Result:</span><span className="font-bold text-slate-900">{selectedStation.detectionResult || 'Screening pending'}</span></div>
                <div className="flex justify-between"><span>Likely Indication:</span><span className="font-bold text-slate-900">{selectedStation.detectionLikelihood || selectedStation.riskLevel}</span></div>
                <div className="flex justify-between"><span>Screening Score:</span><span className="font-bold text-emerald-700">{selectedStation.confidenceLabel || Math.round(selectedStation.confidence)}%</span></div>
              </div>

              <Button variant="primary" icon={ArrowUpRight} onClick={() => navigate('/results')} className="w-full">
                View Full Report
              </Button>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default PollutionMap;
