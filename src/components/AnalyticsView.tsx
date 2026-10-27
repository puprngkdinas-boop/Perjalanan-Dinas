import React from 'react';
import { BarChart3, TrendingUp, DollarSign, MapPin, Users, Award, FileText } from 'lucide-react';
import { Trip, Employee, Activity, TripReport } from '../types';

interface AnalyticsViewProps {
  trips: Trip[];
  employees: Employee[];
  activities: Activity[];
  reports: TripReport[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  trips,
  employees,
  activities,
  reports
}) => {
  const totalBudget = activities.reduce((sum, a) => sum + a.pagu, 0);
  const totalRealized = activities.reduce((sum, a) => sum + a.realized, 0);
  const totalTripCost = trips.reduce((sum, t) => sum + t.totalCost, 0);

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  // Calculate destination counts
  const destinationCounts: { [key: string]: number } = {};
  trips.forEach(t => {
    const mainArea = t.destination.split(' ')[0] + ' ' + (t.destination.split(' ')[1] || '');
    destinationCounts[mainArea] = (destinationCounts[mainArea] || 0) + 1;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-extrabold text-slate-900">Visualisasi & Analitik Perjalanan Dinas</h2>
        <p className="text-xs text-slate-500">Statistik penyerapan anggaran, distribusi wilayah tujuan, dan rekapitulasi penugasan Bidang SDA</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Total Pagu Anggaran SDA</span>
            <DollarSign className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold mb-1">{formatIDR(totalBudget)}</div>
          <p className="text-xs text-blue-200">Tahun Anggaran 2026</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Biaya Perjalanan Dinas</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{formatIDR(totalTripCost)}</div>
          <p className="text-xs text-emerald-600 font-medium">{trips.length} Dokumen SPT diterbitkan</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Laporan Hasil Selesai</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{reports.length} Laporan</div>
          <p className="text-xs text-indigo-600 font-medium">Dokumentasi & rekomendasi lapangan</p>
        </div>
      </div>

      {/* Charts & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Budget Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Penyerapan Anggaran per Kegiatan (MAK)</h3>
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

        {/* Destination Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Distribusi Wilayah Tujuan Perjalanan</h3>
          <div className="space-y-3 pt-2">
            {Object.entries(destinationCounts).map(([dest, count], idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{dest}</h4>
                    <p className="text-xs text-slate-500">Wilayah Kerja Kabupaten Nagekeo</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                    {count} Perjalanan
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl mt-4">
            <h4 className="text-xs font-bold text-indigo-900 uppercase mb-1">Catatan Pengawasan SDA</h4>
            <p className="text-xs text-indigo-800 leading-relaxed">
              Sebagian besar perjalanan dinas difokuskan pada pengawasan pembangunan jaringan irigasi primer dan sekunder di Kecamatan Aesesa dan Boawae untuk mendukung kedaulatan pangan Kabupaten Nagekeo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
