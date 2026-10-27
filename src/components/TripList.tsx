import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Printer, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  FileSpreadsheet
} from 'lucide-react';
import { Trip, Employee, Activity, TripStatus } from '../types';

interface TripListProps {
  trips: Trip[];
  employees: Employee[];
  activities: Activity[];
  onOpenExcelForm: () => void;
  onSelectTripForDoc: (trip: Trip) => void;
  onDeleteTrip: (id: string) => void;
}

export const TripList: React.FC<TripListProps> = ({
  trips,
  employees,
  activities,
  onOpenExcelForm,
  onSelectTripForDoc,
  onDeleteTrip
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const getEmpName = (empId: string) => {
    const emp = employees.find(e => e.id === empId);
    return emp ? emp.name : 'Pegawai';
  };

  const filteredTrips = trips.filter(trip => {
    const matchSearch = 
      trip.sptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.tempatTugas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.maksudPerjalanan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.personnel.some(p => getEmpName(p.employeeId).toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchStatus = statusFilter === 'ALL' || trip.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Daftar Perjalanan Dinas Bidang SDA</h2>
          <p className="text-xs text-slate-500">
            Arsip dokumen Surat Perintah Tugas (SPT), Surat Perjalanan Dinas (SPD), dan Rekapitulasi Pembayaran
          </p>
        </div>
        <button
          onClick={onOpenExcelForm}
          className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-4 py-2.5 rounded-xl text-sm font-extrabold shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Isi Form SPT & SPPD Baru</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari No. SPT, Nama Pegawai, atau Desa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {['ALL', 'Disetujui', 'Laporan Masuk', 'Selesai'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st 
                  ? 'bg-blue-900 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' ? 'Semua Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Trips Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Nomor SPT & SPPD</th>
                <th className="py-3.5 px-4">Tim Penerima Tugas</th>
                <th className="py-3.5 px-4">Tujuan & Maksud</th>
                <th className="py-3.5 px-4">Waktu</th>
                <th className="py-3.5 px-4">Total Biaya Kolektif</th>
                <th className="py-3.5 px-4 text-right">Aksi Dokumen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredTrips.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    Tidak ada data perjalanan dinas yang sesuai.
                  </td>
                </tr>
              ) : (
                filteredTrips.map((trip) => {
                  const total = trip.personnel.reduce((sum, p) => sum + p.total, 0);
                  const firstEmp = getEmpName(trip.personnel[0]?.employeeId);

                  return (
                    <tr key={trip.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-mono font-bold text-slate-900 text-xs">{trip.sptNumber}</div>
                        <div className="text-[11px] text-red-600 font-mono mt-0.5">
                          SPD: {trip.personnel[0]?.spdNumber.split('/')[2]} s/d {trip.personnel[trip.personnel.length - 1]?.spdNumber.split('/')[2]}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span>{firstEmp}</span>
                          {trip.personnel.length > 1 && (
                            <span className="text-xs text-slate-500">, dkk ({trip.personnel.length} orang)</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">
                          {trip.personnel.slice(0, 3).map(p => getEmpName(p.employeeId).split(',')[0]).join(', ')}
                          {trip.personnel.length > 3 ? '...' : ''}
                        </div>
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <div className="font-bold text-slate-900 flex items-center gap-1 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                          <span>{trip.tempatTugas}</span>
                        </div>
                        <div className="text-xs text-slate-600 truncate mt-0.5">
                          {trip.maksudPerjalanan}
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-xs">
                        <div className="font-medium text-slate-800 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{trip.tanggalBerangkat}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">{trip.lamaPerjalanan} Hari</div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-bold text-blue-900 font-mono text-xs">{formatIDR(total)}</div>
                        <div className="text-[11px] text-slate-500">{trip.alatAngkut}</div>
                      </td>

                      <td className="py-4 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => onSelectTripForDoc(trip)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Buka / Cetak</span>
                        </button>
                        <button
                          onClick={() => onDeleteTrip(trip.id)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg transition-colors inline-flex cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
