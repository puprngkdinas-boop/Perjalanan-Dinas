import React, { useState } from 'react';
import { 
  Printer, 
  X, 
  FileText, 
  DollarSign, 
  CheckSquare, 
  CreditCard,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';
import { Trip, Employee, Activity } from '../types';
import { OfficialKopSurat } from './OfficialKopSurat';

interface DocumentGeneratorModalProps {
  trip: Trip;
  employees: Employee[];
  activities: Activity[];
  onClose: () => void;
}

export const DocumentGeneratorModal: React.FC<DocumentGeneratorModalProps> = ({
  trip,
  employees,
  activities,
  onClose
}) => {
  const [docTab, setDocTab] = useState<
    'spt' | 'spd' | 'spd_belakang' | 'laporan' | 'visual' | 'kwitansi' | 'kolektif'
  >('spt');

  const [activeSpdIndex, setActiveSpdIndex] = useState<number>(0);

  const getEmp = (id: string): Employee | undefined => {
    return employees.find(e => e.id === id);
  };

  const personnelList = trip.personnel.map(p => ({
    ...p,
    employee: getEmp(p.employeeId)
  })).filter(p => p.employee !== undefined);

  const currentSpdPersonnel = personnelList[activeSpdIndex] || personnelList[0];

  const totalKolektif = personnelList.reduce((acc, p) => acc + p.total, 0);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[96vh] flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold">
                Dokumen Resmi Perjalanan Dinas Kab. Nagekeo
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                SPT: {trip.sptNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Dokumen Terpilih</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Buttons matching PDF pages */}
        <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex flex-wrap gap-1.5 print:hidden overflow-x-auto text-xs">
          {[
            { id: 'spt', label: '1. SPT (Surat Tugas)' },
            { id: 'spd', label: '2. SPD (Lembar Depan)' },
            { id: 'spd_belakang', label: '3. Visum / SPD Belakang' },
            { id: 'laporan', label: '4. Laporan Hasil' },
            { id: 'visual', label: '5. Data Visual / Foto' },
            { id: 'kwitansi', label: '6. Tanda Bukti Bayar (Kwitansi)' },
            { id: 'kolektif', label: '7. Pembayaran Kolektif (Bank NTT)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDocTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                docTab === tab.id
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SPD Person Selector if in SPD tab */}
        {docTab === 'spd' && personnelList.length > 1 && (
          <div className="bg-blue-50 px-5 py-2 border-b border-blue-200 flex items-center justify-between text-xs print:hidden">
            <div className="flex items-center gap-2 font-semibold text-blue-900">
              <span>Pilih Petugas untuk Cetak Lembar SPD:</span>
              <div className="flex gap-1">
                {personnelList.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSpdIndex(idx)}
                    className={`px-2.5 py-1 rounded font-mono font-bold text-xs ${
                      activeSpdIndex === idx
                        ? 'bg-blue-700 text-white shadow'
                        : 'bg-white text-blue-900 border border-blue-300 hover:bg-blue-100'
                    }`}
                  >
                    Petugas {idx + 1}: {p.employee?.name.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-[11px] text-blue-700 font-mono">
              No. SPD: {currentSpdPersonnel?.spdNumber}
            </span>
          </div>
        )}

        {/* Printable Paper Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/70 print:bg-white print:p-0">
          <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white p-8 sm:p-12 shadow-md border border-slate-300 print:shadow-none print:border-none print:w-full print:m-0 text-black font-serif leading-snug">
            
            {/* 1. SURAT PERINTAH TUGAS (SPT) - EXACT FORMAT PAGE 11 */}
            {docTab === 'spt' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <OfficialKopSurat />

                <div className="text-center space-y-0.5 pt-1">
                  <h3 className="font-bold underline uppercase text-sm sm:text-base tracking-wide">
                    SURAT PERINTAH TUGAS (SPT)
                  </h3>
                  <p className="font-mono text-xs">Nomor : {trip.sptNumber}</p>
                </div>

                <div className="pt-2 space-y-3">
                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-4 font-semibold">1. Pejabat Pemberi Tugas</div>
                    <div className="col-span-8">: {trip.pejabatPemberiTugas}</div>
                  </div>

                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-4 font-semibold">2. Penerima Tugas</div>
                    <div className="col-span-8 space-y-2">
                      <div className="text-slate-400 font-normal">:</div>
                      {personnelList.map((p, idx) => (
                        <div key={idx} className="pl-4 space-y-0.5 border-l-2 border-slate-300">
                          <div className="font-bold">
                            {idx + 1}). Nama : {p.employee?.name}
                          </div>
                          <div className="text-xs">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NIP. : {p.employee?.nip}
                          </div>
                          <div className="text-xs">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jabatan : {p.employee?.position}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 pt-1">
                    <div className="col-span-4 font-semibold">3. Maksud Perjalanan Dinas</div>
                    <div className="col-span-8">: {trip.maksudPerjalanan}</div>
                  </div>

                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-4 font-semibold">4. Alat Angkut yang Digunakan</div>
                    <div className="col-span-8">: {trip.alatAngkut}</div>
                  </div>

                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-4 font-semibold">5. a. Tempat Berangkat</div>
                    <div className="col-span-8">: {trip.tempatBerangkat}</div>
                    <div className="col-span-4 font-semibold pl-4">b. Tempat Tujuan</div>
                    <div className="col-span-8">: {trip.tempatTugas}</div>
                  </div>

                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-4 font-semibold">6. Lamanya Perjalanan Dinas</div>
                    <div className="col-span-8">: {trip.lamaPerjalanan}</div>
                    <div className="col-span-4 font-semibold pl-4">a. Tanggal Berangkat</div>
                    <div className="col-span-8">: {trip.tanggalBerangkat}</div>
                    <div className="col-span-4 font-semibold pl-4">b. Tanggal Harus Kembali</div>
                    <div className="col-span-8">: {trip.tanggalKembali}</div>
                  </div>
                </div>

                {/* Tanda Tangan Kadis */}
                <div className="flex justify-end pt-10">
                  <div className="text-left w-72 text-xs sm:text-sm">
                    <p>Ditetapkan di : {trip.tempatBerangkat}</p>
                    <p>Pada Tanggal : {trip.tanggalPenandatanganan}</p>
                    <p className="mt-1 font-semibold">
                      {trip.pejabatPenandatanganTipe === 1 
                        ? 'Kepala Dinas Pekerjaan Umum dan Penataan Ruang Kab.Nagekeo,'
                        : 'Sekretaris Dinas Pekerjaan Umum dan Penataan Ruang Kab.Nagekeo,'}
                    </p>
                    <div className="h-20 flex items-center justify-center">
                      <span className="text-[11px] text-slate-300 italic border border-dashed border-slate-300 p-2 rounded">
                        [Stempel Dinas & TTD]
                      </span>
                    </div>
                    <p className="font-bold underline uppercase">
                      {trip.pejabatPenandatanganTipe === 1 ? trip.kadisName : trip.sekretarisName}
                    </p>
                    <p className="text-xs">
                      {trip.pejabatPenandatanganTipe === 1 ? trip.kadisPangkat : 'Pembina - IV/b'}
                    </p>
                    <p className="text-xs font-mono">
                      Nip. {trip.pejabatPenandatanganTipe === 1 ? trip.kadisNip : trip.sekretarisNip}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SURAT PERJALANAN DINAS (SPD LEMBAR DEPAN) - EXACT FORMAT PAGES 12-17 */}
            {docTab === 'spd' && currentSpdPersonnel && (
              <div className="space-y-4 text-xs sm:text-sm">
                <OfficialKopSurat />

                <div className="text-center space-y-0.5 pt-1">
                  <h3 className="font-bold underline uppercase text-sm sm:text-base tracking-wide">
                    SURAT PERJALANAN DINAS (SPD)
                  </h3>
                  <p className="font-mono text-xs">NOMOR : {currentSpdPersonnel.spdNumber}</p>
                </div>

                <table className="w-full border-collapse border border-black text-xs mt-3">
                  <tbody>
                    <tr>
                      <td className="border border-black p-2 font-bold text-center w-8">1.</td>
                      <td className="border border-black p-2 font-semibold w-64">Pejabat Pemberi Tugas</td>
                      <td className="border border-black p-2" colSpan={2}>: {trip.pejabatPemberiTugas}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold text-center">2.</td>
                      <td className="border border-black p-2 font-semibold">Nama pegawai yang diperintahkan</td>
                      <td className="border border-black p-2 font-bold" colSpan={2}>
                        : {currentSpdPersonnel.employee?.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold text-center">3.</td>
                      <td className="border border-black p-2 font-semibold space-y-1">
                        <div>a. Pangkat dan Golongan</div>
                        <div>b. Jabatan</div>
                        <div>c. Tingkat menurut perjalanan dinas</div>
                      </td>
                      <td className="border border-black p-2 space-y-1" colSpan={2}>
                        <div>: {currentSpdPersonnel.employee?.rank}</div>
                        <div>: {currentSpdPersonnel.employee?.position}</div>
                        <div className="font-bold">: {currentSpdPersonnel.employee?.tingkat}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold text-center">4.</td>
                      <td className="border border-black p-2 font-semibold">Maksud perjalanan dinas</td>
                      <td className="border border-black p-2" colSpan={2}>: {trip.maksudPerjalanan}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold text-center">5.</td>
                      <td className="border border-black p-2 font-semibold">Alat angkut yang dipergunakan</td>
                      <td className="border border-black p-2" colSpan={2}>: {trip.alatAngkut}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold text-center">6.</td>
                      <td className="border border-black p-2 font-semibold space-y-1">
                        <div>a. Tempat berangkat</div>
                        <div>b. Tempat tujuan</div>
                      </td>
                      <td className="border border-black p-2 space-y-1" colSpan={2}>
                        <div>: {trip.tempatBerangkat}</div>
                        <div className="font-bold">: {trip.tempatTugas}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold text-center">7.</td>
                      <td className="border border-black p-2 font-semibold space-y-1">
                        <div>a. Lamanya perjalanan dinas</div>
                        <div>b. Tanggal berangkat</div>
                        <div>c. Tanggal harus kembali</div>
                      </td>
                      <td className="border border-black p-2 space-y-1" colSpan={2}>
                        <div>: {trip.lamaPerjalanan}</div>
                        <div>: {trip.tanggalBerangkat}</div>
                        <div>: {trip.tanggalKembali}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold text-center align-top">8.</td>
                      <td className="border border-black p-2 font-semibold align-top">Pengikut :</td>
                      <td className="border border-black p-0" colSpan={2}>
                        <table className="w-full border-collapse text-[11px]">
                          <thead>
                            <tr className="border-b border-black bg-slate-50 font-bold">
                              <th className="border-r border-black p-1 text-center w-8">No</th>
                              <th className="border-r border-black p-1 text-left">Nama</th>
                              <th className="border-r border-black p-1 text-left w-32">Tanggal Lahir</th>
                              <th className="p-1 text-left">Keterangan</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-r border-black p-1 text-center">1.</td>
                              <td className="border-r border-black p-1">-</td>
                              <td className="border-r border-black p-1">-</td>
                              <td className="p-1">-</td>
                            </tr>
                            <tr>
                              <td className="border-r border-black p-1 text-center">2.</td>
                              <td className="border-r border-black p-1">-</td>
                              <td className="border-r border-black p-1">-</td>
                              <td className="p-1">-</td>
                            </tr>
                            <tr>
                              <td className="border-r border-black p-1 text-center">3.</td>
                              <td className="border-r border-black p-1">-</td>
                              <td className="border-r border-black p-1">-</td>
                              <td className="p-1">-</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold text-center">9.</td>
                      <td className="border border-black p-2 font-semibold space-y-1">
                        <div>a. Pembebanan anggaran</div>
                        <div>b. Mata anggaran</div>
                      </td>
                      <td className="border border-black p-2 space-y-1" colSpan={2}>
                        <div>: {trip.pembebananAnggaran}</div>
                        <div className="font-mono font-bold">: {trip.mataAnggaran}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold text-center">10.</td>
                      <td className="border border-black p-2 font-semibold">Keterangan lain-lain</td>
                      <td className="border border-black p-2" colSpan={2}>:</td>
                    </tr>
                  </tbody>
                </table>

                {/* Tanda Tangan Kadis */}
                <div className="flex justify-end pt-8">
                  <div className="text-left w-72 text-xs sm:text-sm">
                    <p className="font-semibold">
                      Kepala Dinas Pekerjaan Umum dan Penataan Ruang Kab.Nagekeo,
                    </p>
                    <div className="h-16"></div>
                    <p className="font-bold underline uppercase">{trip.kadisName}</p>
                    <p className="text-xs">{trip.kadisPangkat}</p>
                    <p className="text-xs font-mono">Nip. {trip.kadisNip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. SPD LEMBAR BELAKANG (VISUM / PENGESAHAN) - EXACT FORMAT PAGE 18 */}
            {docTab === 'spd_belakang' && (
              <div className="space-y-4 text-xs font-sans">
                <div className="border border-black divide-y divide-black text-[11px] leading-tight">
                  
                  {/* Kolom I */}
                  <div className="grid grid-cols-2 p-2">
                    <div></div>
                    <div className="space-y-1">
                      <p>I. Berangkat dari (Tempat kedudukan) : {trip.tempatBerangkat}</p>
                      <p>&nbsp;&nbsp;&nbsp;Ke : {trip.tempatTugas}</p>
                      <p>&nbsp;&nbsp;&nbsp;Pada Tanggal : {trip.tanggalBerangkat}</p>
                      <p className="font-bold pt-2">
                        Kepala Dinas Pekerjaan Umum dan Penataan Ruang Kab.Nagekeo,
                      </p>
                      <div className="h-12"></div>
                      <p className="font-bold underline">{trip.kadisName}</p>
                      <p className="text-[10px]">{trip.kadisPangkat}</p>
                      <p className="text-[10px] font-mono">Nip. {trip.kadisNip}</p>
                    </div>
                  </div>

                  {/* Kolom II & III */}
                  <div className="grid grid-cols-2 divide-x divide-black">
                    <div className="p-2 space-y-1">
                      <p>II. Tiba di : {trip.tempatTugas2 || trip.tempatTugas}</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;Pada Tanggal : {trip.tanggalBerangkat}</p>
                      <p className="font-bold pt-1">{trip.jabatanPejabatDesa2 || 'Kepala Desa'},</p>
                      <div className="h-12"></div>
                      <p className="font-bold underline">{trip.namaPejabatDesa2 || 'Albertus Dae'}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <p>Berangkat dari : {trip.tempatTugas2 || trip.tempatTugas}</p>
                      <p>Ke : {trip.tempatBerangkat}</p>
                      <p>Pada tanggal : {trip.tanggalKembali}</p>
                      <p className="font-bold pt-1">{trip.jabatanPejabatDesa2 || 'Kepala Desa'},</p>
                      <div className="h-12"></div>
                      <p className="font-bold underline">{trip.namaPejabatDesa2 || 'Albertus Dae'}</p>
                    </div>
                  </div>

                  {/* Kolom IV / V Tiba di Kedudukan */}
                  <div className="grid grid-cols-2 p-2">
                    <div></div>
                    <div className="space-y-1">
                      <p>V. Tiba di : {trip.tempatBerangkat} (Tempat Kedudukan)</p>
                      <p>&nbsp;&nbsp;&nbsp;Pada Tanggal : {trip.tanggalKembali}</p>
                      <p className="pt-1 text-[10px] italic">
                        Telah diperiksa, dengan keterangan bahwa perjalanan tersebut diatas benar dilakukan atas perintahnya dan semata-mata untuk kepentingan jabatan dalam waktu yang sesingkat-singkatnya.
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div>
                          <p className="font-bold">PPTK</p>
                          <div className="h-12"></div>
                          <p className="font-bold underline">{trip.pptkName}</p>
                          <p className="text-[10px] font-mono">Nip. {trip.pptkNip}</p>
                        </div>
                        <div>
                          <p className="font-bold">Kepala Dinas PUPR,</p>
                          <div className="h-12"></div>
                          <p className="font-bold underline">{trip.kadisName}</p>
                          <p className="text-[10px] font-mono">Nip. {trip.kadisNip}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Catatan Lain & Perhatian */}
                  <div className="p-2 space-y-1">
                    <p className="font-bold">VI. Catatan Lain-lain :</p>
                    <p className="font-bold">VII. Perhatian :</p>
                    <p className="text-[10px] text-justify leading-relaxed">
                      PPK yang menerbitkan SPD, pegawai yang melakukan perjalanan dinas, para pejabat yang mengesahkan tanggal berangkat/tiba, serta bendahara pengeluaran bertanggung jawab berdasarkan peraturan - peraturan Keuangan Negara apabila negara menderita rugi akibat kesalahan, kelalaian, dan kealpaannya.
                    </p>
                  </div>

                </div>
              </div>
            )}

            {/* 4. LAPORAN PERJALANAN DINAS - EXACT FORMAT PAGE 19 */}
            {docTab === 'laporan' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <OfficialKopSurat />

                <div className="text-center space-y-0.5 pt-1">
                  <h3 className="font-bold underline uppercase text-sm sm:text-base tracking-wide">
                    LAPORAN PERJALANAN DINAS
                  </h3>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="space-y-1">
                    <div className="font-bold">1. 1. SURAT PERINTAH TUGAS (SPT)</div>
                    <div className="pl-4">
                      Nomor : {trip.sptNumber} &nbsp;&nbsp;&nbsp;&nbsp; Tanggal : {trip.tanggalPenandatanganan}
                    </div>
                    <div className="pl-4 font-semibold">
                      a.n. {personnelList[0]?.employee?.name}, dkk
                    </div>

                    <div className="font-bold pt-1">2. SURAT PERJALANAN DINAS (SPD)</div>
                    <div className="pl-4 space-y-1 font-mono">
                      {personnelList.map((p, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckSquare className="w-3.5 h-3.5 text-blue-800" />
                          <span>NOMOR : {p.spdNumber}</span>
                          <span>Tanggal : {trip.tanggalBerangkat}</span>
                          <span className="font-sans font-bold">a.n. {p.employee?.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 pt-1">
                    <div className="col-span-3 font-bold">2. Maksud Perjalanan</div>
                    <div className="col-span-9">: {trip.maksudPerjalanan}</div>
                  </div>

                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-3 font-bold">3. Tempat Tujuan</div>
                    <div className="col-span-9">: {trip.tempatTugas}</div>
                  </div>

                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-3 font-bold">4. Lama Perjalanan</div>
                    <div className="col-span-9">: {trip.lamaPerjalanan}</div>
                    <div className="col-span-3 font-bold pl-4">a. Tanggal Berangkat</div>
                    <div className="col-span-9">: {trip.tanggalBerangkat}</div>
                    <div className="col-span-3 font-bold pl-4">b. Tanggal Tiba</div>
                    <div className="col-span-9">: {trip.tanggalKembali}</div>
                  </div>

                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-3 font-bold">5. Hasil Perjalanan Dinas</div>
                    <div className="col-span-9 space-y-2">
                      <p>{trip.hasilPerjalananDinas}</p>
                      <ol className="list-decimal list-inside space-y-1 pl-2">
                        {trip.hasilTemuan?.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-3 font-bold">6. Usul / Saran</div>
                    <div className="col-span-9">: {trip.usulSaran || '~'}</div>
                  </div>

                  <p className="pt-2 italic text-slate-700">
                    Demikian laporan ini dibuat untuk dipergunakan sebagaimana mestinya
                  </p>
                </div>

                {/* Tanda Tangan Pelaksana */}
                <div className="flex justify-end pt-6">
                  <div className="w-80 space-y-1 text-xs">
                    <p>Mbay, {trip.tanggalLaporan || trip.tanggalKembali}</p>
                    <p className="font-bold">Yang melaksanakan tugas,</p>
                    <div className="space-y-3 pt-2">
                      {personnelList.map((p, idx) => (
                        <div key={idx} className="flex justify-between items-end border-b border-dotted border-slate-400 pb-1">
                          <div>
                            <div className="font-bold">{idx + 1}. {p.employee?.name}</div>
                            <div className="text-[10px] font-mono text-slate-600">{p.employee?.nip}</div>
                          </div>
                          <div className="text-[11px] font-mono tracking-widest text-slate-400">
                            …………………
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. DATA VISUAL / FOTO DOKUMENTASI - EXACT FORMAT PAGE 20 */}
            {docTab === 'visual' && (
              <div className="space-y-4">
                <div className="text-center font-bold text-sm sm:text-base border-b-2 border-black pb-2">
                  Data Visual {trip.maksudPerjalanan}
                </div>

                <div className="border-4 border-black p-4 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {trip.visualPhotos && trip.visualPhotos.length > 0 ? (
                      trip.visualPhotos.map((photo, i) => (
                        <div key={i} className="border-2 border-black p-1 space-y-1">
                          <img 
                            src={photo.url} 
                            alt={photo.caption} 
                            className="w-full h-44 sm:h-52 object-cover"
                          />
                          <div className="bg-slate-100 p-1.5 text-[11px] font-mono text-slate-800 text-center">
                            {photo.caption}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-slate-400">
                        Belum ada lampiran data visual/foto dokumentasi lapangan.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 6. TANDA BUKTI PEMBAYARAN (KWITANSI) - EXACT FORMAT PAGE 21 */}
            {docTab === 'kwitansi' && (
              <div className="space-y-3 text-xs leading-snug">
                <div className="text-center space-y-0.5 border-b border-black pb-2">
                  <p className="font-bold uppercase tracking-wider text-xs">PEMERINTAH KABUPATEN NAGEKEO</p>
                  <h3 className="font-bold uppercase text-sm tracking-wide">TANDA BUKTI PEMBAYARAN</h3>
                  <p className="text-[11px] font-mono">NOMOR BUKTI :</p>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-4 font-semibold">a. Bendahara Pengeluaran</div>
                    <div className="col-span-8">: DINAS PEKERJAAN UMUM DAN PENATAAN RUANG KABUPATEN NAGEKEO</div>
                  </div>
                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-4 font-semibold">b. Telah Mengeluarkan Uang Sebesar</div>
                    <div className="col-span-8 font-bold font-mono text-sm">: Rp {formatIDR(totalKolektif)}</div>
                  </div>
                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-4 font-semibold">c. Kepada Nama</div>
                    <div className="col-span-8 font-bold">: {personnelList[0]?.employee?.name} dkk</div>
                    <div className="col-span-4 font-semibold pl-4">Alamat</div>
                    <div className="col-span-8">: Mbay</div>
                  </div>
                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-4 font-semibold">d. Sebagai Pembayaran</div>
                    <div className="col-span-8 text-justify">
                      : Perjalanan Dinas Dalam Daerah Sumber Daya Air. {trip.maksudPerjalanan}, an. {personnelList[0]?.employee?.name} dkk, sesuai SPT dan SPPD terlampir pada tanggal {trip.tanggalBerangkat} s/d {trip.tanggalKembali}, {trip.sumberDana}.
                    </div>
                  </div>
                </div>

                {/* Table Breakdown */}
                <table className="w-full border-collapse border border-black text-[10px] mt-2">
                  <thead>
                    <tr className="bg-slate-100 font-bold border-b border-black text-center">
                      <th className="border border-black p-1 w-6" rowSpan={2}>NO</th>
                      <th className="border border-black p-1 w-28" rowSpan={2}>KODE REKENING</th>
                      <th className="border border-black p-1" rowSpan={2}>NAMA</th>
                      <th className="border border-black p-1 w-24" rowSpan={2}>PANGKAT/GOL ESELON</th>
                      <th className="border border-black p-1 w-28" rowSpan={2}>NOMOR SPT</th>
                      <th className="border border-black p-1 w-28" rowSpan={2}>NOMOR SPD</th>
                      <th className="border border-black p-1 w-8" rowSpan={2}>JML HARI</th>
                      <th className="border border-black p-1" colSpan={2}>BESARNYA</th>
                      <th className="border border-black p-1 w-20" rowSpan={2}>TOTAL JML (Rp)</th>
                      <th className="border border-black p-1 w-16" rowSpan={2}>TANDA TANGAN</th>
                    </tr>
                    <tr className="bg-slate-100 font-bold border-b border-black text-center">
                      <th className="border border-black p-1 w-16">BIAYA/HARI (Rp)</th>
                      <th className="border border-black p-1 w-16">TRANSPORT PP (Rp)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personnelList.map((p, idx) => (
                      <tr key={idx} className="border-b border-black">
                        <td className="border border-black p-1 text-center font-bold">{idx + 1}.</td>
                        <td className="border border-black p-1 font-mono text-[9px] text-center">
                          {idx === 0 ? trip.mataAnggaran : ''}
                        </td>
                        <td className="border border-black p-1 font-bold">{p.employee?.name}</td>
                        <td className="border border-black p-1 text-[9px]">{p.employee?.rank}</td>
                        <td className="border border-black p-1 font-mono text-[8px]">{p.sptNumber}</td>
                        <td className="border border-black p-1 font-mono text-[8px]">{p.spdNumber}</td>
                        <td className="border border-black p-1 text-center font-bold">{p.jmlHari}</td>
                        <td className="border border-black p-1 text-right font-mono">Rp {formatIDR(p.biayaHari)}</td>
                        <td className="border border-black p-1 text-right font-mono">Rp {formatIDR(p.transportPP)}</td>
                        <td className="border border-black p-1 text-right font-mono font-bold">Rp {formatIDR(p.total)}</td>
                        <td className="border border-black p-1 text-center text-slate-400">…………</td>
                      </tr>
                    ))}
                    <tr className="font-bold bg-slate-50">
                      <td className="border border-black p-1 text-center font-mono text-[9px]" colSpan={2}>
                        {trip.mataAnggaran}
                      </td>
                      <td className="border border-black p-1 text-right" colSpan={7}>TOTAL</td>
                      <td className="border border-black p-1 text-right font-mono font-extrabold">
                        Rp {formatIDR(totalKolektif)}
                      </td>
                      <td className="border border-black p-1"></td>
                    </tr>
                  </tbody>
                </table>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-8 pt-4 text-xs">
                  <div>
                    <p>d. Tanggal dikeluarkan Uang : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 2026</p>
                    <div className="pt-4 text-center">
                      <p>Mengetahui</p>
                      <p className="font-bold">Pengguna Anggaran,</p>
                      <div className="h-16"></div>
                      <p className="font-bold underline uppercase">{trip.kadisName}</p>
                      <p className="font-mono text-[10px]">Nip. {trip.kadisNip}</p>
                    </div>
                  </div>

                  <div className="text-center pt-5">
                    <p>Mbay, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 2026</p>
                    <p className="font-bold">Bendahara Pengeluaran,</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline uppercase">{trip.bendaharaName}</p>
                    <p className="font-mono text-[10px]">Nip. {trip.bendaharaNip}</p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 pt-2 space-y-0.5">
                  <p>Lembaran Asli</p>
                  <p>Salinan 1</p>
                  <p>Salinan 2</p>
                </div>
              </div>
            )}

            {/* 7. PEMBAYARAN KOLEKTIF (BANK NTT) - EXACT FORMAT PAGE 22 */}
            {docTab === 'kolektif' && (
              <div className="space-y-4 text-xs font-sans">
                <div className="text-center space-y-0.5 border-b border-black pb-2">
                  <p className="font-bold uppercase tracking-wider text-xs">PEMERINTAH KABUPATEN NAGEKEO</p>
                  <h3 className="font-bold uppercase text-sm tracking-wide">
                    DINAS PEKERJAAN UMUM DAN PENATAAN RUANG
                  </h3>
                  <p className="text-[11px] font-semibold">JL. IR SUTAMI-MBAY</p>
                </div>

                <div className="text-center space-y-1 pt-1">
                  <h4 className="font-bold text-xs uppercase tracking-wider underline">
                    PEMBAYARAN KOLEKTIF
                  </h4>
                  <p className="text-[11px] font-bold uppercase">
                    PEMBAYARAN PERJALANAN DINAS BIDANG {trip.namaBidang.toUpperCase()}, KEGIATAN PADA TANGGAL {trip.tanggalBerangkat.toUpperCase()} S/D {trip.tanggalKembali.toUpperCase()}
                  </p>
                </div>

                <table className="w-full border-collapse border border-black text-[10px] mt-3">
                  <thead>
                    <tr className="bg-slate-100 font-bold border-b border-black text-center">
                      <th className="border border-black p-1.5 w-6" rowSpan={2}>NO</th>
                      <th className="border border-black p-1.5 w-20" rowSpan={2}>TANGGAL</th>
                      <th className="border border-black p-1.5" rowSpan={2}>NAMA PENERIMA</th>
                      <th className="border border-black p-1.5 w-24" rowSpan={2}>BRUTO</th>
                      <th className="border border-black p-1.5 w-20">POTONGAN</th>
                      <th className="border border-black p-1.5 w-24" rowSpan={2}>NETO</th>
                      <th className="border border-black p-1.5 w-32" rowSpan={2}>NO.REKENING</th>
                      <th className="border border-black p-1.5 w-32" rowSpan={2}>BANK</th>
                      <th className="border border-black p-1.5 w-20" rowSpan={2}>STATUS TRANSAKSI</th>
                      <th className="border border-black p-1.5 w-20" rowSpan={2}>TANDA TERIMA</th>
                    </tr>
                    <tr className="bg-slate-100 font-bold border-b border-black text-center">
                      <th className="border border-black p-1">PFK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personnelList.map((p, idx) => (
                      <tr key={idx} className="border-b border-black">
                        <td className="border border-black p-1.5 text-center font-bold">{idx + 1}</td>
                        <td className="border border-black p-1.5 text-center">{trip.tanggalBerangkat}</td>
                        <td className="border border-black p-1.5 font-bold">{p.employee?.name}</td>
                        <td className="border border-black p-1.5 text-right font-mono font-semibold">
                          Rp {formatIDR(p.total)}
                        </td>
                        <td className="border border-black p-1.5 text-center font-mono">-</td>
                        <td className="border border-black p-1.5 text-right font-mono font-semibold">
                          Rp {formatIDR(p.total)}
                        </td>
                        <td className="border border-black p-1.5 font-mono text-[9px] text-center">
                          {p.employee?.noRekening || '040 02.06.003898-8'}
                        </td>
                        <td className="border border-black p-1.5 text-center font-semibold">
                          {p.employee?.bank || 'BANK NTT CAB.MBAY'}
                        </td>
                        <td className="border border-black p-1.5 text-center text-slate-400"></td>
                        <td className="border border-black p-1.5 text-center text-slate-400">……………</td>
                      </tr>
                    ))}
                    <tr className="font-bold bg-slate-50">
                      <td className="border border-black p-1.5 text-center" colSpan={3}>Total</td>
                      <td className="border border-black p-1.5 text-right font-mono font-extrabold">
                        Rp {formatIDR(totalKolektif)}
                      </td>
                      <td className="border border-black p-1.5 text-center font-mono">Rp -</td>
                      <td className="border border-black p-1.5 text-right font-mono font-extrabold">
                        Rp {formatIDR(totalKolektif)}
                      </td>
                      <td className="border border-black p-1.5" colSpan={4}></td>
                    </tr>
                  </tbody>
                </table>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-8 pt-8 text-xs">
                  <div className="text-center">
                    <p>Menyetujui</p>
                    <p className="font-bold">Pengguna Anggaran</p>
                    <p className="font-semibold">Dinas PUPR, Kab.Nagekeo,</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline uppercase">{trip.kadisName}</p>
                    <p className="font-mono text-[10px]">Nip. {trip.kadisNip}</p>
                  </div>

                  <div className="text-center">
                    <p>Mbay, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 2026</p>
                    <p className="font-bold">Bendahara Pengeluaran,</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline uppercase">{trip.bendaharaName}</p>
                    <p className="font-mono text-[10px]">Nip. {trip.bendaharaNip}</p>
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
