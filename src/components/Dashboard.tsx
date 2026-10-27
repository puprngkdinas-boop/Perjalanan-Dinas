import React from 'react';
import { 
  FileText, 
  Users, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  FileSpreadsheet,
  Printer,
  ChevronRight,
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';
import { Trip, Employee, Activity } from '../types';

interface DashboardProps {
  trips: Trip[];
  employees: Employee[];
  activities: Activity[];
  setActiveTab: (tab: string) => void;
  onOpenExcelForm: () => void;
  onSelectTripForDoc: (trip: Trip) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  trips,
  employees,
  activities,
  setActiveTab,
  onOpenExcelForm,
  onSelectTripForDoc
}) => {
  const totalBudget = activities.reduce((sum, a) => sum + a.pagu, 0);
  const totalRealized = activities.reduce((sum, a) => sum + a.realized, 0);
  const budgetPercentage = totalBudget > 0 ? Math.round((totalRealized / totalBudget) * 100) : 0;

  const totalTripDisbursed = trips.reduce((sum, t) => {
    return sum + t.personnel.reduce((pSum, p) => pSum + p.total, 0);
  }, 0);

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const getEmpName = (empId: string) => {
    const emp = employees.find(e => e.id === empId);
    return emp ? emp.name : 'Pegawai';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-900/50">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            <span>Dinas PUPR Kabupaten Nagekeo</span>
            <span>•</span>
            <span>Bidang Sumber Daya Air</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sistem Informasi Perjalanan Dinas (SPT & SPD)
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Sesuai format baku Pemerintah Kabupaten Nagekeo. Mencakup otomatisasi penerbitan 
            Surat Perintah Tugas (SPT), Surat Perjalanan Dinas (SPD per personil & lembar visum), 
            Kwitansi Tanda Bukti Bayar, Daftar Pengeluaran Kolektif Bank NTT, dan Laporan Hasil Lapangan.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onOpenExcelForm}
              className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Buka Format Isian SPT & SPPD (Excel)</span>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Pusat Cetak Dokumen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Dokumen SPT / SPD</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{trips.length} <span className="text-xs font-normal text-slate-500">Berkas SPT</span></div>
          <p className="text-xs text-blue-700 font-semibold mt-1">Multi-personil tim lapangan</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Realisasi Belanja</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono text-sm sm:text-lg">{formatIDR(totalTripDisbursed)}</div>
          <p className="text-xs text-emerald-600 font-medium mt-1">Tercatat dalam Kwitansi & Bank NTT</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Pegawai ASN PUPR</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{employees.length} <span className="text-xs font-normal text-slate-500">Personil</span></div>
          <p className="text-xs text-indigo-600 font-medium mt-1">Lengkap NIP, NPWP & No. Rekening</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Kegiatan Bidang SDA</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{activities.length} <span className="text-xs font-normal text-slate-500">Mata Anggaran</span></div>
          <p className="text-xs text-purple-600 font-medium mt-1">DPA T.A. 2026</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Trips */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Perjalanan Dinas Terkini</h3>
              <p className="text-xs text-slate-500">Daftar penugasan dan surat perintah tugas yang aktif</p>
            </div>
            <button
              onClick={() => setActiveTab('trips')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group cursor-pointer"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 font-bold text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 px-3">No. SPT</th>
                  <th className="pb-3 px-3">Penerima Tugas</th>
                  <th className="pb-3 px-3">Tujuan & Maksud</th>
                  <th className="pb-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trips.slice(0, 5).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-slate-900">{t.sptNumber}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Tgl: {t.tanggalBerangkat}</div>
                    </td>
                    <td className="py-3 px-3 font-medium">
                      <div className="text-slate-800 font-bold">{getEmpName(t.personnel[0]?.employeeId)}</div>
                      <div className="text-[10px] text-slate-500">{t.personnel.length} orang petugas</div>
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="font-semibold text-slate-900 truncate">{t.tempatTugas}</div>
                      <div className="text-[11px] text-slate-500 truncate">{t.maksudPerjalanan}</div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onSelectTripForDoc(t)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Cetak</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Format Info Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-700 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Format Standar PDF Terintegrasi</h4>
              <p className="text-[11px] text-slate-500">Sesuai arsip resmi PUPR Nagekeo</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>SPT (Surat Perintah Tugas):</strong> Kop ganda Pemda Nagekeo & PUPR, 6+ penerima tugas.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>SPD (Lembar Depan):</strong> Nomor unik untuk setiap personil (702, 703, ...), tingkat C/D/E/F.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>SPD Lembar Visum:</strong> Pengesahan kedatangan di desa (Kades Tendatoto / Albertus Dae).</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Kwitansi & Pembayaran Kolektif:</strong> Nomor rekening Bank NTT Cab. Mbay & NPWP otomatis.</span>
            </div>
          </div>

          <button
            onClick={onOpenExcelForm}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-yellow-400" />
            <span>Buka Format Isian Excel</span>
          </button>
        </div>
      </div>
    </div>
  );
};
