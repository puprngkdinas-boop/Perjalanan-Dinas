import React from 'react';
import { 
  FileText, 
  Users, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight,
  PlusCircle,
  Printer,
  ChevronRight
} from 'lucide-react';
import { Trip, Employee, Activity, TripReport } from '../types';

interface DashboardProps {
  trips: Trip[];
  employees: Employee[];
  activities: Activity[];
  reports: TripReport[];
  setActiveTab: (tab: string) => void;
  onNewTrip: () => void;
  onSelectTripForDoc: (trip: Trip) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  trips,
  employees,
  activities,
  reports,
  setActiveTab,
  onNewTrip,
  onSelectTripForDoc
}) => {
  const totalBudget = activities.reduce((sum, a) => sum + a.pagu, 0);
  const totalRealized = activities.reduce((sum, a) => sum + a.realized, 0);
  const budgetPercentage = totalBudget > 0 ? Math.round((totalRealized / totalBudget) * 100) : 0;

  const activeTripsCount = trips.filter(t => t.status === 'Berlangsung' || t.status === 'Disetujui').length;
  const completedTripsCount = trips.filter(t => t.status === 'Selesai' || t.status === 'Laporan Masuk').length;

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const getEmployeeName = (empId: string) => {
    const emp = employees.find(e => e.id === empId);
    return emp ? emp.name : 'Pegawai Tidak Ditemukan';
  };

  const getActivityName = (actId: string) => {
    const act = activities.find(a => a.id === actId);
    return act ? act.name : 'Kegiatan Umum';
  };

  const getStatusBadge = (status: Trip['status']) => {
    switch (status) {
      case 'Draft':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 flex items-center gap-1"><Clock className="w-3 h-3"/> Draft</span>;
      case 'Disetujui':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Disetujui</span>;
      case 'Berlangsung':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 flex items-center gap-1"><Clock className="w-3 h-3 animate-pulse"/> Berlangsung</span>;
      case 'Selesai':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Selesai</span>;
      case 'Laporan Masuk':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 flex items-center gap-1"><FileText className="w-3 h-3"/> Laporan Masuk</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Hero Card */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-700/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-blue-200 mb-3 border border-blue-400/20">
            <span>Kabupaten Nagekeo</span>
            <span>•</span>
            <span>Tahun Anggaran 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Sistem Informasi Perjalanan Dinas Bidang SDA
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
            Kelola Surat Perintah Tugas (SPT), Surat Perjalanan Dinas (SPD), Kwitansi, Daftar Bayar, Laporan Perjalanan Dinas, serta Monitoring Anggaran Kegiatan Sumber Daya Air secara terpadu.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onNewTrip}
              className="bg-white text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>Buat Perjalanan Dinas Baru</span>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className="bg-blue-700/80 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm border border-blue-500/40 shadow-lg flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Dokumen Massal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Perjalanan</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{trips.length} <span className="text-xs font-normal text-slate-500">Dokumen</span></div>
          <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <span>{activeTripsCount} perjalanan aktif / disetujui</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Realisasi Anggaran</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{budgetPercentage}%</div>
          <div className="text-xs text-slate-500">
            Dari total pagu {formatIDR(totalBudget)}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pegawai Bidang SDA</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{employees.length} <span className="text-xs font-normal text-slate-500">Personil</span></div>
          <div className="text-xs text-indigo-600 font-medium">
            Struktural & Fungsional Teknis
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Laporan Masuk</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{reports.length} <span className="text-xs font-normal text-slate-500">Laporan</span></div>
          <div className="text-xs text-purple-600 font-medium">
            {completedTripsCount} perjalanan tuntas
          </div>
        </div>
      </div>

      {/* Main Content Sections: Recent Trips & Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Trips Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Perjalanan Dinas Terbaru</h3>
              <p className="text-xs text-slate-500">Daftar SPT & SPD yang diterbitkan Bidang Sumber Daya Air</p>
            </div>
            <button
              onClick={() => setActiveTab('trips')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 px-3">No. SPT / SPD</th>
                  <th className="pb-3 px-3">Pelaksana</th>
                  <th className="pb-3 px-3">Tujuan & Keperluan</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {trips.slice(0, 5).map((trip) => (
                  <tr key={trip.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{trip.sptNumber}</div>
                      <div className="text-xs text-slate-500 font-mono">{trip.spdNumber}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800">{getEmployeeName(trip.employeeId)}</div>
                      {trip.companionIds && trip.companionIds.length > 0 && (
                        <div className="text-xs text-slate-500">+{trip.companionIds.length} pengikut</div>
                      )}
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="font-medium text-slate-900 truncate">{trip.destination}</div>
                      <div className="text-xs text-slate-500 truncate">{trip.purpose}</div>
                    </td>
                    <td className="py-3 px-3">
                      {getStatusBadge(trip.status)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onSelectTripForDoc(trip)}
                        className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Cetak</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Budget Utilization Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Realisasi Anggaran</h3>
              <p className="text-xs text-slate-500">Per Kegiatan (MAK) Bidang SDA</p>
            </div>
            <button
              onClick={() => setActiveTab('activities')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Detail</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4 flex-1">
            {activities.map((act) => {
              const pct = act.pagu > 0 ? Math.round((act.realized / act.pagu) * 100) : 0;
              return (
                <div key={act.id} className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex justify-between items-start text-xs">
                    <span className="font-semibold text-slate-800 line-clamp-1">{act.name}</span>
                    <span className="font-mono text-slate-600 font-bold">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${pct > 80 ? 'bg-amber-500' : 'bg-blue-600'}`} 
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Realisasi: {formatIDR(act.realized)}</span>
                    <span>Pagu: {formatIDR(act.pagu)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-blue-50/50 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-blue-900">Total Pagu T.A. 2026</div>
                <div className="text-sm font-bold text-blue-950">{formatIDR(totalBudget)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
