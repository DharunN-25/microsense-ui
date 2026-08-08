import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlayCircle, 
  Eye, 
  FileText, 
  Activity, 
  Settings, 
  Microscope,
  Camera,
  Zap,
  Sparkles,
  Navigation,
} from 'lucide-react';

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'New Scan', path: '/new-scan', icon: PlayCircle },
    { name: 'Live Analysis', path: '/live-analysis', icon: Eye, badge: 'LIVE' },
    { name: 'Scan Results', path: '/results', icon: FileText },
    { name: 'Sample Photos', path: '/sample-photos', icon: Camera },
    { name: 'Device Health', path: '/health', icon: Activity },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const sensorModules = [
    { name: 'Raspberry Pi Camera Module', detail: 'Visible-light capture · motion-sequence imaging', icon: Camera },
    { name: 'Blue LED Source (450nm)', detail: 'Image illumination for particle motion detection', icon: Zap },
    { name: 'Polarizing Filter', detail: 'Glare suppression · contrast enhancement', icon: Sparkles },
    { name: 'GPS Receiver', detail: '3D fix · 14 satellites · location tagging', icon: Navigation },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white/95 border-r border-slate-200/70 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-slate-900 grid place-items-center text-white shadow-md">
              <Microscope className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-semibold text-slate-900 text-base tracking-tight font-sans">
                MicroSense OS
              </h1>
              <p className="text-[11px] text-slate-500 font-sans uppercase tracking-[0.24em]">
                Instrument v2.4.1
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400 mb-2 font-sans">
            Workstation
          </div>
          
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 rounded-2xl text-sm font-sans transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xl'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
                style={{ minHeight: '52px' }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-[22px] h-[22px]" />
                  <span>{item.name}</span>
                </div>

                {item.badge ? (
                  <span className="inline-flex h-6 items-center px-3 rounded-full border border-rose-200 bg-rose-50 text-[10px] font-semibold text-rose-700">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-slate-100/80">
          <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400 mb-3 font-sans">
            Sensor Modules
          </div>
          <div className="space-y-3">
            {sensorModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div key={mod.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-slate-900 grid place-items-center text-white shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{mod.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{mod.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
