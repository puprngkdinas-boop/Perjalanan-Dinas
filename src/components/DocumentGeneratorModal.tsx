import React, { useState } from 'react';
import { 
  Printer, 
  X, 
  FileText, 
  DollarSign, 
  CheckCircle, 
  Award,
  Building2,
  Calendar,
  User,
  MapPin
} from 'lucide-react';
import { Trip, Employee, Activity, TripReport } from '../types';

interface DocumentGeneratorModalProps {
  trip: Trip;
  employees: Employee[];
  activities: Activity[];
  reports: TripReport[];
  onClose: () => void;
}

export const DocumentGeneratorModal: React.FC<DocumentGeneratorModalProps> = ({
  trip,
  employees,
  activities,
  reports,
  onClose
}) => {
  const [docType, setDocType] = useState<'spt' | 'spd' | 'kwitansi' | 'daftar_bayar' | 'laporan'>('spt');

  const employee = employees.find(e => e.id === trip.employeeId) || employees[0];
  const activity = activities.find(a => a.id === trip.activityId) || activities[0];
  const report = reports.find(r => r.tripId === trip.id);

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  // Terbilang helper for receipts
  const terbilang = (nilai: number): string => {
    const bilangan = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'];
    let hasil = '';
    if (nilai < 12) {
      hasil = bilangan[nilai];
    } else if (nilai < 20) {
      hasil = terbilang(nilai - 10) + ' Belas';
    } else if (nilai < 100) {
      hasil = terbilang(Math.floor(nilai / 10)) + ' Puluh ' + terbilang(nilai % 10);
    } else if (nilai < 200) {
      hasil = 'Seratus ' + terbilang(nilai - 100);
    } else if (nilai < 1000) {
      hasil = terbilang(Math.floor(nilai / 100)) + ' Ratus ' + terbilang(nilai % 100);
    } else if (nilai < 2000) {
      hasil = 'Seribu ' + terbilang(nilai - 1000);
    } else if (nilai < 1000000) {
      hasil = terbilang(Math.floor(nilai / 1000)) + ' Ribu ' + terbilang(nilai % 1000);
    } else if (nilai < 1000000000) {
      hasil = terbilang(Math.floor(nilai / 1000000)) + ' Juta ' + terbilang(nilai % 1000000);
    } else if (nilai < 1000000000000) {
      hasil = terbilang(Math.floor(nilai / 1000000000)) + ' Miliar ' + terbilang(nilai % 1000000000);
    }
    return hasil.trim() + ' Rupiah';
  };

  const nights = Math.max(trip.durationDays - 1, 1);
  const perDiemTotal = trip.perDiemRate * trip.durationDays;
  const lodgingTotal = trip.lodgingCost * nights;
  const grandTotal = perDiemTotal + trip.transportCost + lodgingTotal;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Pusat Cetak Dokumen Perjalanan Dinas</h3>
              <p className="text-xs text-slate-400">Pemerintah Kabupaten Nagekeo - Dinas PUPR Bidang SDA</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Print PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Type Selector Tabs */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex flex-wrap gap-2 print:hidden">
          {[
            { id: 'spt', label: '1. Surat Perintah Tugas (SPT)' },
            { id: 'spd', label: '2. Surat Perjalanan Dinas (SPD)' },
            { id: 'kwitansi', label: '3. Kwitansi Pembayaran' },
            { id: 'daftar_bayar', label: '4. Daftar Pengeluaran Riil' },
            { id: 'laporan', label: '5. Laporan Perjalanan Dinas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDocType(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                docType === tab.id
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Document Preview Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-50 print:bg-white print:p-0">
          <div className="max-w-[210mm] mx-auto bg-white p-8 sm:p-12 shadow-sm rounded-xl border border-slate-200 print:shadow-none print:border-none print:w-full">
            
            {/* GOV HEADER FOR ALL DOCUMENTS */}
            <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                PEMERINTAH KABUPATEN NAGEKEO
              </div>
              <div className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
                DINAS PEKERJAAN UMUM DAN PENATAAN RUANG
              </div>
              <div className="text-xs font-bold text-blue-900">
                BIDANG SUMBER DAYA AIR (SDA)
              </div>
              <div className="text-[11px] text-slate-600 mt-1">
                Jalan El Tari, Mbay - Kabupaten Nagekeo, Nusa Tenggara Timur
              </div>
            </div>

            {/* 1. SPT (Surat Perintah Tugas) */}
            {docType === 'spt' && (
              <div className="space-y-6 text-slate-900 text-sm leading-relaxed">
                <div className="text-center space-y-1">
                  <h4 className="font-bold underline uppercase tracking-wide text-base">SURAT PERINTAH TUGAS</h4>
                  <p className="text-xs font-mono text-slate-600">Nomor: {trip.sptNumber}</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex gap-4">
                    <span className="font-semibold w-24">DASAR :</span>
                    <div className="flex-1 space-y-1">
                      <p>1. Program Kerja Bidang Sumber Daya Air Dinas PUPR Kabupaten Nagekeo Tahun Anggaran 2026.</p>
                      <p>2. Dokumen Pelaksanaan Anggaran (DPA) Kegiatan <span className="font-semibold">{activity.name}</span> dengan Kode MAK: <span className="font-mono font-bold">{activity.code}</span>.</p>
                    </div>
                  </div>

                  <div className="text-center py-2 font-bold uppercase tracking-widest text-slate-700">
                    M E M E R I N T A H K A N
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <span className="font-semibold">Kepada :</span>
                    <div className="col-span-3 space-y-3">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                        <div className="font-bold">{employee.name}</div>
                        <div className="text-xs text-slate-600">NIP. {employee.nip}</div>
                        <div className="text-xs text-slate-600">Pangkat/Gol: {employee.rank}</div>
                        <div className="text-xs text-slate-600 font-medium">Jabatan: {employee.position}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2">
                    <span className="font-semibold">Untuk :</span>
                    <div className="col-span-3 space-y-2">
                      <p><span className="font-semibold">1. Tujuan:</span> {trip.destination}</p>
                      <p><span className="font-semibold">2. Keperluan:</span> {trip.purpose}</p>
                      <p><span className="font-semibold">3. Waktu Pelaksanaan:</span> {trip.startDate} s.d {trip.endDate} ({trip.durationDays} Hari)</p>
                      <p><span className="font-semibold">4. Angkutan:</span> {trip.transportType} ({trip.vehicleDetails || 'Dinas'})</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="italic text-xs text-slate-600">
                      Demikian Surat Perintah Tugas ini dibuat untuk dilaksanakan dengan penuh rasa tanggung jawab.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-12">
                  <div className="text-center w-64">
                    <p>Dikeluarkan di : Mbay</p>
                    <p>Pada Tanggal : {trip.createdAt}</p>
                    <p className="font-bold mt-1">{trip.approverPosition},</p>
                    <div className="h-20"></div>
                    <p className="font-bold underline">{trip.approverName}</p>
                    <p className="text-xs font-mono">NIP. {trip.approverNip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SPD (Surat Perjalanan Dinas) */}
            {docType === 'spd' && (
              <div className="space-y-6 text-slate-900 text-sm leading-relaxed">
                <div className="flex justify-between items-start border-b border-slate-300 pb-3">
                  <div>
                    <h4 className="font-bold uppercase tracking-wide text-base">SURAT PERJALANAN DINAS (SPD)</h4>
                    <p className="text-xs text-slate-600 font-mono">Nomor SPD: {trip.spdNumber}</p>
                  </div>
                  <div className="text-right text-xs font-mono">
                    <p>Lembar Ke : 1</p>
                    <p>Kode MAK: {activity.code}</p>
                  </div>
                </div>

                <table className="w-full border-collapse border border-slate-400 text-xs">
                  <tbody>
                    <tr>
                      <td className="border border-slate-400 p-2 font-semibold w-1/12">1.</td>
                      <td className="border border-slate-400 p-2 font-semibold w-4/12">Pengguna Anggaran / Kuasa Pengguna Anggaran</td>
                      <td className="border border-slate-400 p-2" colSpan={3}>Dinas Pekerjaan Umum dan Penataan Ruang Kab. Nagekeo</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 font-semibold">2.</td>
                      <td className="border border-slate-400 p-2 font-semibold">Nama Pegawai yang diperintah</td>
                      <td className="border border-slate-400 p-2 font-bold" colSpan={3}>{employee.name}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 font-semibold">3.</td>
                      <td className="border border-slate-400 p-2 font-semibold">NIP / Pangkat / Golongan / Jabatan</td>
                      <td className="border border-slate-400 p-2" colSpan={3}>
                        NIP. {employee.nip} / {employee.rank} / {employee.position}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 font-semibold">4.</td>
                      <td className="border border-slate-400 p-2 font-semibold">Maksud Perjalanan Dinas</td>
                      <td className="border border-slate-400 p-2" colSpan={3}>{trip.purpose}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 font-semibold">5.</td>
                      <td className="border border-slate-400 p-2 font-semibold">Alat Angkutan yang dipergunakan</td>
                      <td className="border border-slate-400 p-2" colSpan={3}>{trip.transportType} ({trip.vehicleDetails})</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 font-semibold" rowSpan={2}>6.</td>
                      <td className="border border-slate-400 p-2 font-semibold">a. Tempat Berangkat<br/>b. Tempat Tujuan</td>
                      <td className="border border-slate-400 p-2" colSpan={3}>a. Mbay<br/>b. {trip.destination}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 font-semibold">Lamanya Perjalanan Dinas</td>
                      <td className="border border-slate-400 p-2" colSpan={3}>
                        {trip.durationDays} (Hari) — Dari tanggal {trip.startDate} s.d {trip.endDate}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 font-semibold">7.</td>
                      <td className="border border-slate-400 p-2 font-semibold">Pembebanan Anggaran<br/>a. Instansi<br/>b. Akun / Kegiatan</td>
                      <td className="border border-slate-400 p-2" colSpan={3}>
                        a. Dinas PUPR Kab. Nagekeo<br/>b. {activity.code} — {activity.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 font-semibold">8.</td>
                      <td className="border border-slate-400 p-2 font-semibold">Keterangan Lain-lain</td>
                      <td className="border border-slate-400 p-2" colSpan={3}>Perjalanan dinas resmi Bidang Sumber Daya Air T.A. 2026.</td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex justify-between pt-8">
                  <div className="text-center w-56">
                    <p>Tiba di : {trip.destination}</p>
                    <p>Pada Tanggal : {trip.startDate}</p>
                    <p className="font-bold mt-1">Pejabat yang Berwenang,</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">( ___________________________ )</p>
                  </div>
                  <div className="text-center w-56">
                    <p>Dikeluarkan di : Mbay</p>
                    <p>Pada Tanggal : {trip.createdAt}</p>
                    <p className="font-bold mt-1">{trip.approverPosition},</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">{trip.approverName}</p>
                    <p className="text-xs font-mono">NIP. {trip.approverNip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. KWITANSI PEMBAYARAN */}
            {docType === 'kwitansi' && (
              <div className="space-y-6 text-slate-900 text-sm leading-relaxed border-2 border-slate-900 p-6 sm:p-8 rounded-xl">
                <div className="flex justify-between items-start border-b border-slate-300 pb-4">
                  <div>
                    <div className="text-xs font-bold text-slate-500 font-mono">T.A. 2026</div>
                    <h4 className="font-bold uppercase tracking-wide text-lg text-blue-900">KWITANSI / BUKTI PEMBAYARAN</h4>
                  </div>
                  <div className="text-right text-xs font-mono">
                    <p>No. Bukti: KWT-{trip.id.substring(5)}</p>
                    <p>Kode MAK: {activity.code}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    <span className="font-semibold text-slate-600">Sudah Terima Dari :</span>
                    <span className="col-span-3 font-bold">Bendahara Pengeluaran Dinas PUPR Kabupaten Nagekeo</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <span className="font-semibold text-slate-600">Uang Sejumlah :</span>
                    <span className="col-span-3 font-extrabold text-blue-900 bg-blue-50 p-2 rounded-lg border border-blue-200">
                      {formatIDR(grandTotal)}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <span className="font-semibold text-slate-600">Terbilang :</span>
                    <span className="col-span-3 italic font-semibold text-slate-800">
                      " {terbilang(grandTotal)} "
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <span className="font-semibold text-slate-600">Untuk Pembayaran :</span>
                    <span className="col-span-3">
                      Biaya Perjalanan Dinas dalam rangka <span className="font-semibold">{trip.purpose}</span> ke {trip.destination} berdasarkan SPT Nomor: {trip.sptNumber} dan SPD Nomor: {trip.spdNumber}.
                    </span>
                  </div>
                </div>

                {/* Breakdown table */}
                <div className="pt-2">
                  <table className="w-full border-collapse border border-slate-300 text-xs">
                    <thead>
                      <tr className="bg-slate-100 font-bold">
                        <th className="border border-slate-300 p-2 text-left">Komponen Biaya</th>
                        <th className="border border-slate-300 p-2 text-center">Perhitungan / Volume</th>
                        <th className="border border-slate-300 p-2 text-right">Jumlah (Rp)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-2">Uang Harian Perjalanan Dinas</td>
                        <td className="border border-slate-300 p-2 text-center">{trip.durationDays} Hari × {formatIDR(trip.perDiemRate)}</td>
                        <td className="border border-slate-300 p-2 text-right">{formatIDR(perDiemTotal)}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">Biaya Transportasi / Tiket / BBM</td>
                        <td className="border border-slate-300 p-2 text-center">At Cost / Riil ({trip.transportType})</td>
                        <td className="border border-slate-300 p-2 text-right">{formatIDR(trip.transportCost)}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">Biaya Penginapan / Hotel</td>
                        <td className="border border-slate-300 p-2 text-center">{nights} Malam × {formatIDR(trip.lodgingCost)}</td>
                        <td className="border border-slate-300 p-2 text-right">{formatIDR(lodgingTotal)}</td>
                      </tr>
                      <tr className="bg-slate-50 font-bold">
                        <td className="border border-slate-300 p-2" colSpan={2}>TOTAL JUMLAH PEMBAYARAN</td>
                        <td className="border border-slate-300 p-2 text-right text-blue-900">{formatIDR(grandTotal)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-8 text-center">
                  <div>
                    <p>Mengetahui / Setuju Dibayar:</p>
                    <p className="font-bold">{trip.approverPosition}</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">{trip.approverName}</p>
                    <p className="text-xs font-mono">NIP. {trip.approverNip}</p>
                  </div>
                  <div>
                    <p>Lunas Dibayar Tanggal:</p>
                    <p className="font-bold">Bendahara Pengeluaran</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">Adrianus Woda, S.Sos.</p>
                    <p className="text-xs font-mono">NIP. 19881204 201402 1 005</p>
                  </div>
                  <div>
                    <p>Menerima Uang Sejumlah:</p>
                    <p className="font-bold">Yang Menerima,</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">{employee.name}</p>
                    <p className="text-xs font-mono">NIP. {employee.nip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. DAFTAR PENGELUARAN RIIL / DAFTAR BAYAR */}
            {docType === 'daftar_bayar' && (
              <div className="space-y-6 text-slate-900 text-sm leading-relaxed">
                <div className="text-center space-y-1 border-b border-slate-300 pb-4">
                  <h4 className="font-bold uppercase tracking-wide text-base">DAFTAR PENGELUARAN RIIL</h4>
                  <p className="text-xs text-slate-600">Lampiran SPD Nomor: {trip.spdNumber}</p>
                </div>

                <p className="text-xs leading-relaxed text-slate-700">
                  Yang bertanda tangan di bawah ini:</p>
                <div className="pl-4 space-y-1 text-xs">
                  <p><span className="font-semibold w-32 inline-block">Nama:</span> {employee.name}</p>
                  <p><span className="font-semibold w-32 inline-block">NIP:</span> {employee.nip}</p>
                  <p><span className="font-semibold w-32 inline-block">Jabatan:</span> {employee.position}</p>
                </div>

                <p className="text-xs leading-relaxed text-slate-700 pt-2">
                  Berdasarkan Surat Perintah Tugas (SPT) Nomor <span className="font-semibold">{trip.sptNumber}</span> tanggal <span className="font-semibold">{trip.createdAt}</span>, dengan ini kami menyatakan sesungguhnya bahwa:
                </p>

                <ol className="list-decimal list-inside text-xs space-y-2 text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <li>Biaya transportasi pegawai dan/atau biaya penginapan di bawah ini tidak diperoleh bukti pengeluaran resminya dari pihak penyedia jasa/transportasi umum.</li>
                  <li>Jumlah pengeluaran riil di bawah ini benar-benar dikeluarkan untuk pelaksanaan perjalanan dinas dimaksud dan apabila dikemudian hari terdapat kelebihan atas pembayaran, kami bersedia menyetorkannya kembali ke Kas Daerah.</li>
                </ol>

                <table className="w-full border-collapse border border-slate-300 text-xs mt-4">
                  <thead>
                    <tr className="bg-slate-100 font-bold">
                      <th className="border border-slate-300 p-2 text-center w-12">No</th>
                      <th className="border border-slate-300 p-2 text-left">Rincian Peruntukan Pengeluaran Riil</th>
                      <th className="border border-slate-300 p-2 text-right">Jumlah (Rp)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-2 text-center">1</td>
                      <td className="border border-slate-300 p-2">Biaya Transport Lokal / BBM / Ojek Lapangan ({trip.transportType})</td>
                      <td className="border border-slate-300 p-2 text-right">{formatIDR(trip.transportCost)}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 text-center">2</td>
                      <td className="border border-slate-300 p-2">Akomodasi Penginapan Lapangan ({nights} Malam)</td>
                      <td className="border border-slate-300 p-2 text-right">{formatIDR(lodgingTotal)}</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="border border-slate-300 p-2 text-center" colSpan={2}>TOTAL PENGELUARAN RIIL</td>
                      <td className="border border-slate-300 p-2 text-right text-blue-900">{formatIDR(trip.transportCost + lodgingTotal)}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex justify-between pt-12">
                  <div className="text-center w-56">
                    <p>Mengetahui / Menyetujui:</p>
                    <p className="font-bold">{trip.approverPosition}</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">{trip.approverName}</p>
                    <p className="text-xs font-mono">NIP. {trip.approverNip}</p>
                  </div>
                  <div className="text-center w-56">
                    <p>Mbay, {trip.startDate}</p>
                    <p className="font-bold">Pelaksana Perjalanan Dinas,</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">{employee.name}</p>
                    <p className="text-xs font-mono">NIP. {employee.nip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. LAPORAN PERJALANAN DINAS */}
            {docType === 'laporan' && (
              <div className="space-y-6 text-slate-900 text-sm leading-relaxed">
                <div className="text-center space-y-1 border-b border-slate-300 pb-4">
                  <h4 className="font-bold uppercase tracking-wide text-base">LAPORAN HASIL PERJALANAN DINAS</h4>
                  <p className="text-xs text-slate-600 font-mono">Berdasarkan SPT No. {trip.sptNumber}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <p><span className="font-semibold">Nama Pelaksana:</span> {employee.name}</p>
                    <p><span className="font-semibold">Jabatan:</span> {employee.position}</p>
                    <p><span className="font-semibold">NIP:</span> {employee.nip}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Tujuan:</span> {trip.destination}</p>
                    <p><span className="font-semibold">Tanggal:</span> {trip.startDate} s.d {trip.endDate}</p>
                    <p><span className="font-semibold">Kegiatan:</span> {activity.name}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <h5 className="font-bold text-blue-900 border-b border-blue-200 pb-1 mb-2">I. Maksud & Tujuan Perjalanan</h5>
                    <p className="text-slate-800">{trip.purpose}</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-blue-900 border-b border-blue-200 pb-1 mb-2">II. Ringkasan Pelaksanaan Kegiatan</h5>
                    <p className="text-slate-800">
                      {report ? report.summary : 'Pelaksanaan perjalanan dinas berjalan dengan lancar sesuai jadwal yang telah ditetapkan oleh Bidang Sumber Daya Air Dinas PUPR Kabupaten Nagekeo.'}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-blue-900 border-b border-blue-200 pb-1 mb-2">III. Temuan & Hasil Lapangan</h5>
                    <ul className="list-disc list-inside space-y-1 text-slate-800">
                      {report && report.findings.length > 0 ? (
                        report.findings.map((f, i) => <li key={i}>{f}</li>)
                      ) : (
                        <>
                          <li>Kondisi fisik di lapangan secara umum terpantau baik dan sesuai dengan spesifikasi teknis rencana anggaran biaya (RAB).</li>
                          <li>Koordinasi dengan pihak pemangku kepentingan tingkat kecamatan berjalan harmonis.</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-blue-900 border-b border-blue-200 pb-1 mb-2">IV. Kesimpulan & Rekomendasi Tindak Lanjut</h5>
                    <ul className="list-disc list-inside space-y-1 text-slate-800">
                      {report && report.recommendations.length > 0 ? (
                        report.recommendations.map((rec, i) => <li key={i}>{rec}</li>)
                      ) : (
                        <>
                          <li>Diperlukan monitoring rutin berkala setiap dua minggu sekali oleh pengawas teknis lapangan.</li>
                          <li>Menyampaikan laporan progres fisik kepada Kepala Dinas PUPR untuk evaluasi berkala.</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end pt-12">
                  <div className="text-center w-64">
                    <p>Mbay, {trip.endDate}</p>
                    <p className="font-bold mt-1">Pelapor / Pelaksana Tugas,</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">{employee.name}</p>
                    <p className="text-xs font-mono">NIP. {employee.nip}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
