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
  User, 
  DollarSign,
  FileCheck
} from 'lucide-react';
import { Trip, Employee, Activity, TripStatus } from '../types';

interface TripListProps {
  trips: Trip[];
  employees: Employee[];
  activities: Activity[];
  onAddTrip: (trip: Trip) => void;
  onUpdateTrip: (trip: Trip) => void;
  onDeleteTrip: (id: string) => void;
  onSelectTripForDoc: (trip: Trip) => void;
  onOpenReportModal: (trip: Trip) => void;
}

export const TripList: React.FC<TripListProps> = ({
  trips,
  employees,
  activities,
  onAddTrip,
  onUpdateTrip,
  onDeleteTrip,
  onSelectTripForDoc,
  onOpenReportModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  // Form state
  const [sptNumber, setSptNumber] = useState('');
  const [spdNumber, setSpdNumber] = useState('');
  const [employeeId, setEmployeeId] = useState(employees[0]?.id || '');
  const [activityId, setActivityId] = useState(activities[0]?.id || '');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [transportType, setTransportType] = useState<Trip['transportType']>('Kendaraan Dinas');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [accommodationType, setAccommodationType] = useState<Trip['accommodationType']>('Hotel / Penginapan');
  const [perDiemRate, setPerDiemRate] = useState(450000);
  const [transportCost, setTransportCost] = useState(350000);
  const [lodgingCost, setLodgingCost] = useState(600000);
  const [status, setStatus] = useState<TripStatus>('Disetujui');
  const [approverName, setApproverName] = useState('Ir. Yulius da Silva, M.T.');
  const [approverNip, setApproverNip] = useState('19681231 199803 1 045');
  const [approverPosition, setApproverPosition] = useState('Kepala Dinas PUPR Kab. Nagekeo');

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const getEmployeeName = (empId: string) => {
    const emp = employees.find(e => e.id === empId);
    return emp ? emp.name : 'Pegawai Tidak Ditemukan';
  };

  const handleOpenAddModal = () => {
    setEditingTrip(null);
    const randomNo = Math.floor(Math.random() * 900) + 100;
    setSptNumber(`${randomNo}/SDA-PUPR/IV/2026`);
    setSpdNumber(`${randomNo}/SPD/SDA-PUPR/IV/2026`);
    setEmployeeId(employees[0]?.id || '');
    setActivityId(activities[0]?.id || '');
    setDestination('');
    setPurpose('');
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate(new Date().toISOString().split('T')[0]);
    setTransportType('Kendaraan Dinas');
    setVehicleDetails('Mobil Dinas Hilux EB 8101 E');
    setAccommodationType('Hotel / Penginapan');
    setPerDiemRate(450000);
    setTransportCost(350000);
    setLodgingCost(600000);
    setStatus('Disetujui');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (trip: Trip) => {
    setEditingTrip(trip);
    setSptNumber(trip.sptNumber);
    setSpdNumber(trip.spdNumber);
    setEmployeeId(trip.employeeId);
    setActivityId(trip.activityId);
    setDestination(trip.destination);
    setPurpose(trip.purpose);
    setStartDate(trip.startDate);
    setEndDate(trip.endDate);
    setTransportType(trip.transportType);
    setVehicleDetails(trip.vehicleDetails || '');
    setAccommodationType(trip.accommodationType);
    setPerDiemRate(trip.perDiemRate);
    setTransportCost(trip.transportCost);
    setLodgingCost(trip.lodgingCost);
    setStatus(trip.status);
    setApproverName(trip.approverName);
    setApproverNip(trip.approverNip);
    setApproverPosition(trip.approverPosition);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculate duration in days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Total cost calculation: (perDiemRate * durationDays) + transportCost + (lodgingCost * (durationDays > 1 ? durationDays - 1 : 1))
    const nights = Math.max(durationDays - 1, 1);
    const totalCost = (perDiemRate * durationDays) + transportCost + (lodgingCost * nights);

    const tripData: Trip = {
      id: editingTrip ? editingTrip.id : `trip-${Date.now()}`,
      sptNumber,
      spdNumber,
      employeeId,
      activityId,
      destination,
      purpose,
      startDate,
      endDate,
      durationDays: Math.max(durationDays, 1),
      transportType,
      vehicleDetails,
      accommodationType,
      perDiemRate,
      transportCost,
      lodgingCost,
      totalCost,
      status,
      approverName,
      approverNip,
      approverPosition,
      createdAt: editingTrip ? editingTrip.createdAt : new Date().toISOString().split('T')[0]
    };

    if (editingTrip) {
      onUpdateTrip(tripData);
    } else {
      onAddTrip(tripData);
    }
    setIsModalOpen(false);
  };

  const filteredTrips = trips.filter(trip => {
    const empName = getEmployeeName(trip.employeeId).toLowerCase();
    const matchSearch = trip.sptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          empName.includes(searchTerm.toLowerCase()) ||
                          trip.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || trip.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (s: TripStatus) => {
    switch (s) {
      case 'Draft':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">Draft</span>;
      case 'Disetujui':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Disetujui</span>;
      case 'Berlangsung':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Berlangsung</span>;
      case 'Selesai':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Selesai</span>;
      case 'Laporan Masuk':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">Laporan Masuk</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Perjalanan Dinas (SPT & SPD)</h2>
          <p className="text-xs text-slate-500">Kelola dokumen penugasan resmi, surat jalan, dan rincian biaya perjalanan dinas Bidang SDA</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Buat SPT & SPD Baru</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari No. SPT, Pegawai, atau Tujuan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {['ALL', 'Disetujui', 'Berlangsung', 'Selesai', 'Laporan Masuk', 'Draft'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
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
                <th className="py-3.5 px-4">Nomor Surat (SPT / SPD)</th>
                <th className="py-3.5 px-4">Pelaksana Tugas</th>
                <th className="py-3.5 px-4">Tujuan & Waktu</th>
                <th className="py-3.5 px-4">Estimasi Biaya</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi Dokumen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredTrips.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    Tidak ada data perjalanan dinas yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredTrips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{trip.sptNumber}</div>
                      <div className="text-xs text-slate-500 font-mono">SPD: {trip.spdNumber}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        <span>{getEmployeeName(trip.employeeId)}</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {trip.companionIds && trip.companionIds.length > 0 ? `+ ${trip.companionIds.length} pengikut` : 'Tanpa pengikut'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>{trip.destination}</span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{trip.startDate} s.d {trip.endDate} ({trip.durationDays} hari)</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{formatIDR(trip.totalCost)}</div>
                      <div className="text-[11px] text-slate-500">{trip.transportType}</div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(trip.status)}
                    </td>
                    <td className="py-4 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => onSelectTripForDoc(trip)}
                        title="Cetak SPT, SPD, Kwitansi & Daftar Bayar"
                        className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-lg text-xs font-semibold shadow-sm inline-flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span className="hidden xl:inline">Cetak</span>
                      </button>
                      <button
                        onClick={() => onOpenReportModal(trip)}
                        title="Laporan Perjalanan Dinas"
                        className="bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white p-2 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span className="hidden xl:inline">Laporan</span>
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(trip)}
                        title="Edit Perjalanan Dinas"
                        className="bg-slate-100 text-slate-700 hover:bg-slate-200 p-2 rounded-lg transition-colors inline-flex"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteTrip(trip.id)}
                        title="Hapus"
                        className="bg-rose-50 text-rose-600 hover:bg-rose-100 p-2 rounded-lg transition-colors inline-flex"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingTrip ? 'Edit Perjalanan Dinas' : 'Buat Perjalanan Dinas Baru'}
                </h3>
                <p className="text-xs text-slate-500">Pemerintah Kabupaten Nagekeo - Dinas PUPR Bidang SDA</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nomor SPT</label>
                  <input
                    type="text"
                    required
                    value={sptNumber}
                    onChange={(e) => setSptNumber(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="090/SDA-PUPR/IV/2026"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nomor SPD</label>
                  <input
                    type="text"
                    required
                    value={spdNumber}
                    onChange={(e) => setSpdNumber(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="027/SPD/SDA-PUPR/IV/2026"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pegawai Pelaksana Utama</label>
                  <select
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name} ({emp.position})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kegiatan (MAK / DPA)</label>
                  <select
                    value={activityId}
                    onChange={(e) => setActivityId(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {activities.map(act => (
                      <option key={act.id} value={act.id}>{act.code} - {act.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tujuan Perjalanan Dinas</label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Kecamatan Aesesa / Bendung Sutami"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Maksud / Keperluan Perjalanan Dinas</label>
                <textarea
                  required
                  rows={3}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Inspeksi teknis jaringan irigasi dan koordinasi lapangan..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tanggal Selesai</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alat Angkutan</label>
                  <select
                    value={transportType}
                    onChange={(e) => setTransportType(e.target.value as any)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Kendaraan Dinas">Kendaraan Dinas</option>
                    <option value="Kendaraan Umum/Bus">Kendaraan Umum/Bus</option>
                    <option value="Pesawat Udara">Pesawat Udara</option>
                    <option value="Kendaraan Pribadi">Kendaraan Pribadi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Detail Kendaraan / Nopol</label>
                  <input
                    type="text"
                    value={vehicleDetails}
                    onChange={(e) => setVehicleDetails(e.target.value)}
                    placeholder="Mobil Hilux EB 8101 E"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status Dokumen</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TripStatus)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Disetujui">Disetujui</option>
                    <option value="Berlangsung">Berlangsung</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Laporan Masuk">Laporan Masuk</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Uang Harian / Hari (Rp)</label>
                  <input
                    type="number"
                    required
                    value={perDiemRate}
                    onChange={(e) => setPerDiemRate(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Biaya Transport (Rp)</label>
                  <input
                    type="number"
                    required
                    value={transportCost}
                    onChange={(e) => setTransportCost(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Penginapan / Malam (Rp)</label>
                  <input
                    type="number"
                    required
                    value={lodgingCost}
                    onChange={(e) => setLodgingCost(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                >
                  {editingTrip ? 'Simpan Perubahan' : 'Terbitkan SPT & SPD'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
