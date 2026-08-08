import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Page Components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NewScan from './pages/NewScan';
import LiveAnalysis from './pages/LiveAnalysis';
import ScanResults from './pages/ScanResults';
import SamplePhotos from './pages/SamplePhotos';
import PollutionMap from './pages/PollutionMap';
import Reports from './pages/Reports';
import DeviceHealth from './pages/DeviceHealth';
import Settings from './pages/Settings';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Main Workstation Layout Shell */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="new-scan" element={<NewScan />} />
          <Route path="live-analysis" element={<LiveAnalysis />} />
          <Route path="results" element={<ScanResults />} />
          <Route path="sample-photos" element={<SamplePhotos />} />
          <Route path="map" element={<PollutionMap />} />
          <Route path="reports" element={<Reports />} />
          <Route path="health" element={<DeviceHealth />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
