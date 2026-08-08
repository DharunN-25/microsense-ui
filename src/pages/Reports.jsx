import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileSpreadsheet, 
  Download, 
  Search, 
  ArrowUpRight, 
  CheckSquare, 
  Square
} from 'lucide-react';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import { recentScansData } from '../data/dummyData';

export const Reports = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredReports = recentScansData.filter(r => {
    const matchesSearch = r.location.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'All' || r.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-slate-100 text-slate-700 border border-slate-200">
              REGISTRY DATABASE
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-mono tracking-tight">
            Analytical Reports Database
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Historical database of visible-screening logs, feature size ranges, and spectral telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="secondary" icon={FileSpreadsheet} onClick={() => alert('Exporting to CSV...')}>
            Export CSV ({selectedIds.length})
          </Button>
          <Button variant="primary" icon={Download} onClick={() => window.print()}>
            Print Summary
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search report ID or location..."
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
          <option value="All">All Risk Levels</option>
          <option value="Safe">Safe (&lt; 5 particles/L)</option>
          <option value="Moderate">Moderate Risk (5 - 25/L)</option>
          <option value="Critical">Critical Hazard (&gt; 25/L)</option>
        </select>
      </div>

      <Card header="Laboratory Registry Records">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
              <th className="pb-2 px-2 w-10">Select</th>
              <th className="pb-2 px-2">Sample ID</th>
              <th className="pb-2 px-2">Timestamp</th>
              <th className="pb-2 px-2">Sampling Location</th>
              <th className="pb-2 px-2">Density</th>
              <th className="pb-2 px-2">Polymer</th>
              <th className="pb-2 px-2">Status</th>
              <th className="pb-2 px-2 text-right">Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 px-2">
                  <button onClick={() => toggleSelect(report.id)}>
                    {selectedIds.includes(report.id) ? <CheckSquare className="w-4 h-4 text-slate-900" /> : <Square className="w-4 h-4 text-slate-400" />}
                  </button>
                </td>
                <td className="py-2.5 px-2 font-bold text-slate-900">{report.id}</td>
                <td className="py-2.5 px-2 text-slate-500">{report.dateTime}</td>
                <td className="py-2.5 px-2 text-slate-900">{report.location}</td>
                <td className="py-2.5 px-2 font-bold text-slate-900">{report.detectionResult || 'Screening pending'}</td>
                <td className="py-2.5 px-2 text-teal-700">{report.dominantPolymer}</td>
                <td className="py-2.5 px-2">
                  <StatusBadge type={report.riskLevel} text={report.riskLevel} size="sm" />
                </td>
                <td className="py-2.5 px-2 text-right">
                  <button onClick={() => navigate('/results')} className="p-1 text-slate-600 hover:text-slate-900">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Reports;
