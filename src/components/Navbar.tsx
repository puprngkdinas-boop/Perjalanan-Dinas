import React from 'react';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
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
    { id: 'excel_form', label: 'Form Isian SPT & SPPD (Format Excel)', icon: FileSpreadsheet },
    { id: 'trips', label: 'Daftar Perjalanan Dinas', icon: FileText },
    { id: 'employees', label: 'Data ASN Dinas PUPR (37 Pegawai)', icon: Users },
    { id: 'activities', label: 'Kegiatan DPA & MAK', icon: Briefcase },
    { id: 'analytics', label: 'Visualisasi & Data Lapangan', icon: BarChart3 },
    { id: 'documents', label: 'Pusat Cetak Dokumen Resmi', icon: Printer },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-40 border-b border-blue-900/50">
      {/* Top Banner / Gov Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 py-2.5 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500 text-blue-950 flex items-center justify-center shadow-md font-bold text-lg border border-yellow-300">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-yellow-400 font-semibold flex items-center gap-1.5">
                <span>Pemerintah Kabupaten Nagekeo</span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                <span>Dinas PUPR</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-wide">
                Bidang Sumber Daya Air (SDA) — SIMPD
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/90 px-3 py-1.5 rounded-full border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Format Standar Dinas PUPR Kab. Nagekeo</span>
            </div>
            <button
              onClick={() => setActiveTab('excel_form')}
              className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Input SPT/SPPD (Format Excel)</span>
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
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
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
