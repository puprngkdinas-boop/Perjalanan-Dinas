import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Briefcase, 
  BarChart3, 
  Printer, 
  PlusCircle, 
  Building2,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewTrip: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onNewTrip }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trips', label: 'Perjalanan Dinas (SPT/SPD)', icon: FileText },
    { id: 'employees', label: 'Data Pegawai', icon: Users },
    { id: 'activities', label: 'Kegiatan & Anggaran (DPA)', icon: Briefcase },
    { id: 'analytics', label: 'Visualisasi & Laporan', icon: BarChart3 },
    { id: 'documents', label: 'Pusat Cetak Dokumen', icon: Printer },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-40 border-b border-blue-900/50">
      {/* Top Banner / Gov Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 py-2.5 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md font-bold text-lg border border-blue-400/30">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-1.5">
                <span>Pemerintah Kabupaten Nagekeo</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Dinas PUPR</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-wide">
                Bidang Sumber Daya Air (SDA)
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SIMPD v2.6 • Anggaran T.A. 2026</span>
            </div>
            <button
              onClick={onNewTrip}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Perjalanan Dinas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
        <nav className="flex space-x-1 py-2 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
