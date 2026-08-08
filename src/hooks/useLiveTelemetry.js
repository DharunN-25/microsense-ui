import { useState, useEffect } from 'react';
import { deviceStatusData } from '../data/dummyData';

export const useLiveTelemetry = () => {
  const [telemetry, setTelemetry] = useState({
    timeStr: '',
    dateStr: '',
    uptimeSeconds: 52120, // ~14h 28m
    cpuUsage: 14.2,
    temperature: 24.2,
    batteryLevel: 92,
    gpsSignal: "-64 dBm (3D Fix)",
    wifiStatus: "Connected (5G Mesh)",
    queueCount: 3,
    lastSyncSecs: 12,
    diskUsage: "14.2 GB / 64 GB",
    memoryUsage: "2.4 GB / 8.0 GB",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });

      setTelemetry(prev => {
        // Fluctuating values
        const nextCpu = Math.max(8.0, Math.min(28.0, +(prev.cpuUsage + (Math.random() - 0.5) * 1.8).toFixed(1)));
        const nextTemp = Math.max(22.0, Math.min(26.5, +(prev.temperature + (Math.random() - 0.5) * 0.2).toFixed(1)));
        const nextSync = prev.lastSyncSecs >= 30 ? 0 : prev.lastSyncSecs + 1;

        return {
          ...prev,
          timeStr,
          dateStr,
          uptimeSeconds: prev.uptimeSeconds + 1,
          cpuUsage: nextCpu,
          temperature: nextTemp,
          lastSyncSecs: nextSync,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return {
    ...telemetry,
    formattedUptime: formatUptime(telemetry.uptimeSeconds),
    serialNumber: deviceStatusData.serialNumber,
    operatorName: deviceStatusData.operatorName,
    operatorId: deviceStatusData.operatorId,
    organization: deviceStatusData.organization,
    institution: deviceStatusData.institution,
  };
};

export default useLiveTelemetry;
