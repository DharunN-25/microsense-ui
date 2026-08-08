import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartLine, Droplet, Layers, Camera, Play } from 'lucide-react';
import TopHeader from '../components/dashboard/TopHeader';
import StatCard from '../components/dashboard/StatCard';
import LDRChart from '../components/dashboard/LDRChart';
import RecentResultsTable from '../components/dashboard/RecentResultsTable';
import SampleGallery from '../components/dashboard/SampleGallery';
import useLiveTelemetry from '../hooks/useLiveTelemetry';
import { deviceStatusData, recentScansData } from '../data/dummyData';

const topCards = [
  {
    title: 'Visible Screening Result',
    value: 'Likely particles observed',
    label: 'Visible-light frame-sequence screening',
    icon: ChartLine,
    accentClass: 'bg-blue-50 border-blue-100',
  },
  {
    title: 'Evidence Status',
    value: 'No strong evidence',
    label: 'Most recent screening outcome',
    icon: Droplet,
    accentClass: 'bg-emerald-50 border-emerald-100',
  },
  {
    title: 'Total Scans',
    value: '≈1.5k',
    label: 'Approximate sample runs screened',
    icon: Layers,
    accentClass: 'bg-violet-50 border-violet-100',
  },
  {
    title: 'Latest Frame',
    value: '16:42, Aug 7',
    label: 'Most recent camera frame',
    icon: Camera,
    accentClass: 'bg-orange-50 border-orange-100',
  },
];

const chartData = [
  { time: '09:00', count: 12 },
  { time: '10:00', count: 18 },
  { time: '11:00', count: 22 },
  { time: '12:00', count: 28 },
  { time: '13:00', count: 34 },
  { time: '14:00', count: 49 },
  { time: '15:00', count: 38 },
  { time: '16:00', count: 26 },
  { time: '17:00', count: 17 },
];

const recentResults = recentScansData.slice(0, 5);

const galleryItems = recentScansData.slice(0, 4).map((item) => ({
  id: item.id,
  date: item.timestamp.split('T')[0],
  time: item.timestamp.split('T')[1].replace('Z', ''),
  resultText: item.detectionResult,
  statusLabel: item.status,
  statusType: item.riskColor,
  imageSequence: item.imageSequence,
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const telemetry = useLiveTelemetry();

  return (
    <div className="space-y-6">
      <TopHeader
        instrumentId={deviceStatusData.serialNumber}
        operatorName={deviceStatusData.operatorName}
        currentDateTime={{ date: telemetry.dateStr, time: telemetry.timeStr }}
        scanLocation={recentScansData[0]?.locationLabel}
        scanCoordinates={recentScansData[0]?.gps}
        onStart={() => navigate('/new-scan')}
      />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {topCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </section>

      <SampleGallery items={galleryItems} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,65%)_minmax(0,35%)]">
        <LDRChart data={chartData} />
        <RecentResultsTable readings={recentResults} />
      </section>
    </div>
  );
};

export default Dashboard;
