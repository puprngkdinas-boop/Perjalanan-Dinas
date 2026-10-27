import React from 'react';
import { BarChart3, TrendingUp, DollarSign, MapPin, Users, FileText, Camera } from 'lucide-react';
import { Trip, Employee, Activity } from '../types';

interface AnalyticsViewProps {
  trips: Trip[];
  employees: Employee[];
  activities: Activity[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  trips,
  employees,
  activities
}) => {
  const totalBudget = activities.reduce((sum, a) => sum + a.pagu, 0);
  const totalTripCost = trips.reduce((sum, t) => {
    return sum + t.personnel.reduce((pSum, p) => pSum + p.total, 0);
  }, 0);

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const destinationCounts: { [key: string]: number } = {};
  trips.forEach(t => {
    destinationCounts[t.tempatTugas] = (destinationCounts[t.tempatTugas] || 0) + 1;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-extrabold text-slate-900">Visualisasi & Laporan Data Lapangan</h2>
        <p className="text-xs text-slate-500">
          Statistik penugasan perjalanan dinas, data visual dokumentasi lapangan, dan serapan anggaran Bidang SDA
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-2xl shadow-md border border-blue-900/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Total Pagu DPA SDA</span>
            <DollarSign className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-extrabold mb-1">{formatIDR(totalBudget)}</div>
          <p className="text-xs text-blue-200">T.A. 2026 Dinas PUPR Kab. Nagekeo</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Belanja Perjalanan Dinas</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{formatIDR(totalTripCost)}</div>
          <p className="text-xs text-emerald-600 font-medium">{trips.length} Berkas Surat Tugas Diterbitkan</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dokumentasi Visual Tersimpan</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Camera className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {trips.reduce((acc, t) => acc + (t.visualPhotos?.length || 0), 0)} Foto
          </div>
          <p className="text-xs text-purple-600 font-medium">Lengkap timestamp & koordinat GPS</p>
        </div>
      </div>

      {/* Visual Photos Gallery from Field */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900">Galeri Data Visual Hasil Survey Lapangan</h3>
            <p className="text-xs text-slate-500">Lampiran foto dokumentasi fisik lapangan bergeotag</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {trips.flatMap(t => t.visualPhotos || []).map((photo, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm group">
              <div className="h-44 overflow-hidden bg-slate-100">
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-white text-[11px] font-mono text-slate-700 leading-tight">
                {photo.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Realisasi per Kegiatan (MAK)</h3>
          <div className="space-y-4 pt-2">
            {activities.map((act) => {
              const pct = act.pagu > 0 ? Math.round((act.realized / act.pagu) * 100) : 0;
              return (
                <div key={act.id} className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{act.name}</span>
                    <span className="font-mono font-bold text-blue-900">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Realisasi: {formatIDR(act.realized)}</span>
                    <span>Pagu: {formatIDR(act.pagu)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Distribusi Wilayah Tujuan Penugasan</h3>
          <div className="space-y-3 pt-2">
            {Object.entries(destinationCounts).map(([dest, count], idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span className="font-bold text-slate-800">{dest}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full font-bold bg-blue-600 text-white text-[11px]">
                  {count} Penugasan
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
