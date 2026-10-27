import React, { useState } from 'react';
import { FileSpreadsheet, Check, RefreshCw, Printer, AlertTriangle, Users, ArrowRight } from 'lucide-react';
import { Employee, Activity, Trip, TripPersonnel } from '../types';

interface ExcelFormatFormProps {
  employees: Employee[];
  activities: Activity[];
  onSaveTrip: (trip: Trip) => void;
  onPreviewDocs: (trip: Trip) => void;
  initialTrip?: Trip;
}

export const ExcelFormatForm: React.FC<ExcelFormatFormProps> = ({
  employees,
  activities,
  onSaveTrip,
  onPreviewDocs,
  initialTrip
}) => {
  const [nomorSpt, setNomorSpt] = useState(initialTrip?.sptRawNo || '701');
  const [nomorSppdStart, setNomorSppdStart] = useState<number>(initialTrip?.spdStartNo || 702);
  const [indeksBulan, setIndeksBulan] = useState(initialTrip?.indeksBulan || '06');
  const [indeksTahun, setIndeksTahun] = useState(initialTrip?.indeksTahun || '2026');

  // Selected personnel numbers (up to 6 people)
  const defaultPersonNo = initialTrip
    ? initialTrip.personnel.map(p => {
        const emp = employees.find(e => e.id === p.employeeId);
        return emp ? emp.noUrut : 6;
      })
    : [6, 11, 7, 8, 12, 9];

  const [person1, setPerson1] = useState<number>(defaultPersonNo[0] || 6);
  const [person2, setPerson2] = useState<number>(defaultPersonNo[1] || 11);
  const [person3, setPerson3] = useState<number>(defaultPersonNo[2] || 7);
  const [person4, setPerson4] = useState<number>(defaultPersonNo[3] || 8);
  const [person5, setPerson5] = useState<number>(defaultPersonNo[4] || 12);
  const [person6, setPerson6] = useState<number>(defaultPersonNo[5] || 9);

  const [maksudPerjalanan, setMaksudPerjalanan] = useState(
    initialTrip?.maksudPerjalanan || 'Dalam Rangka Survey Geolistrik air tanah di Desa Nggolombay'
  );
  const [tempatTugas, setTempatTugas] = useState(initialTrip?.tempatTugas || 'Desa Nggolombai');
  const [tempatTugas2, setTempatTugas2] = useState(initialTrip?.tempatTugas2 || 'Desa Tendatoto');
  const [jabatanPejabatDesa2, setJabatanPejabatDesa2] = useState(initialTrip?.jabatanPejabatDesa2 || 'Kepala Desa Tendatoto');
  const [namaPejabatDesa2, setNamaPejabatDesa2] = useState(initialTrip?.namaPejabatDesa2 || 'Albertus Dae');

  const [lamaPerjalanan, setLamaPerjalanan] = useState<number>(initialTrip?.lamaPerjalanan || 1);
  const [tanggalBerangkat, setTanggalBerangkat] = useState(initialTrip?.tanggalBerangkat || '14 July 2026');
  const [tanggalKembali, setTanggalKembali] = useState(initialTrip?.tanggalKembali || '14 July 2026');
  const [tanggalTtd, setTanggalTtd] = useState(initialTrip?.tanggalPenandatanganan || '14 July 2026');

  const [alatAngkut, setAlatAngkut] = useState(initialTrip?.alatAngkut || 'Kendaraan Pribadi');
  const [pejabatTtdTipe, setPejabatTtdTipe] = useState<1 | 2>(initialTrip?.pejabatPenandatanganTipe || 1);

  const [mataAnggaran, setMataAnggaran] = useState(
    initialTrip?.mataAnggaran || '1.03.02.2.02.0002.5.1.02.04.001.00003'
  );
  const [kodeRup, setKodeRup] = useState(initialTrip?.kodeRup || '28797272');
  const [namaBidang, setNamaBidang] = useState(initialTrip?.namaBidang || 'Sumber Daya Air');
  const [sumberDana, setSumberDana] = useState(initialTrip?.sumberDana || 'Pendapatan transfer antar Daerah');

  // Rates for Kwitansi & Bayar
  const [biayaPerHari, setBiayaPerHari] = useState(initialTrip?.personnel[0]?.biayaHari || 170000);
  const [transportPP, setTransportPP] = useState(initialTrip?.personnel[0]?.transportPP || 60000);
  const [totalPerPerson, setTotalPerPerson] = useState(initialTrip?.personnel[0]?.total || 400000);

  const getEmpByNo = (num: number) => {
    return employees.find(e => e.noUrut === num);
  };

  const activePersons = [person1, person2, person3, person4, person5, person6]
    .filter(n => n > 0)
    .map((num, idx) => {
      const emp = getEmpByNo(num);
      return {
        emp,
        spdNo: nomorSppdStart + idx,
        fullSpd: `000.1.2.3/DPUPR-NGK/${nomorSppdStart + idx}/${indeksBulan}/${indeksTahun}`
      };
    })
    .filter(item => item.emp !== undefined);

  const handleCreateTripObject = (): Trip => {
    const fullSpt = `000.1.2.3/DPUPR-NGK/${nomorSpt}/${indeksBulan}/${indeksTahun}`;
    const personnelList: TripPersonnel[] = activePersons.map(p => ({
      employeeId: p.emp!.id,
      spdNumber: p.fullSpd,
      sptNumber: fullSpt,
      jmlHari: 2, // 2 hari perhitungan bayar
      biayaHari: biayaPerHari,
      transportPP: transportPP,
      total: totalPerPerson
    }));

    return {
      id: initialTrip ? initialTrip.id : `trip-${Date.now()}`,
      sptRawNo: nomorSpt,
      sptNumber: fullSpt,
      spdStartNo: nomorSppdStart,
      indeksBulan,
      indeksTahun,
      personnel: personnelList,
      maksudPerjalanan,
      tempatTugas,
      tempatTugas2,
      namaPejabatDesa2,
      jabatanPejabatDesa2,
      lamaPerjalanan,
      tanggalBerangkat,
      tanggalKembali,
      tanggalPenandatanganan: tanggalTtd,
      tanggalLaporan: tanggalKembali,
      tanggalKwitansi: tanggalTtd,
      alatAngkut,
      tempatBerangkat: 'Mbay',
      pejabatPemberiTugas: 'Pengguna Anggaran',
      pembebananAnggaran: 'DPA Dinas Pekerjaan Umum Dan Penataan Ruang',
      mataAnggaran,
      kodeRup,
      namaBidang,
      sumberDana,
      pejabatPenandatanganTipe: pejabatTtdTipe,
      kadisName: 'SYARIFUDIN IBRAHIM, ST',
      kadisNip: '196811021997031008',
      kadisPangkat: 'Pembina Utama Muda - IV/c',
      sekretarisName: 'ANSELMUS MERE, SE',
      sekretarisNip: '197404132009011007',
      bendaharaName: 'FLORENTINA WONGA',
      bendaharaNip: '19780822200312 2 006',
      pptkName: 'ANSELMUS MERE, SE',
      pptkNip: '197404132009011007',
      status: 'Laporan Masuk',
      hasilPerjalananDinas: 'Telah melakukan pengukuran geolistrik di Desa Tendatot, Kecamatan Aesesa Selatan, dengan hasil sebagai berikut:',
      hasilTemuan: [
        'Tim menuju lokasi pertama pada koordinat 8°38\'28.42"S; 121°27\'21.90"E dan melaksanakan pengukuran geolistrik dengan hasil Geolistrik Pendugaan Kedalaman Akuifer lepas pada kedalaman 26,9 meter s/d 46 meter dengan tebal akuifer lepas 27,3 meter.',
        'Data Terlampir'
      ],
      usulSaran: '~',
      visualPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f191d?auto=format&fit=crop&q=80&w=800',
          caption: '11.03.2026 10:36 - 8.64132, 121.45596 (Pemasangan elektroda survey air tanah)'
        },
        {
          url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800',
          caption: '11.03.2026 10:36 - 8.64125, 121.45596 (Pencatatan data geolistrik dan GPS)'
        },
        {
          url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800',
          caption: '11.03.2026 10:35 - 8.64139, 121.45589 (Koordinasi lapangan dengan warga dan perangkat desa)'
        },
        {
          url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
          caption: '11.03.2026 10:35 - 8.64140, 121.45581 (Pemeriksaan titik akuifer air tanah di lokasi)'
        }
      ],
      createdAt: tanggalTtd
    };
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trip = handleCreateTripObject();
    onSaveTrip(trip);
    alert('Data Isian SPT & SPPD Berhasil Disimpan!');
  };

  const handlePreview = () => {
    const trip = handleCreateTripObject();
    onPreviewDocs(trip);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Excel Sheet Card Container */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-300 overflow-hidden">
        {/* Banner Title */}
        <div className="bg-red-600 text-white p-3 font-mono text-center font-bold text-sm tracking-wide border-b-2 border-red-700">
          FORMAT ISIAN SPT DAN SPPD DALAM DAERAH
        </div>
        
        {/* Instruction Note from PDF */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center justify-between text-xs text-amber-900 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold underline">PETUNJUK :</span>
            <span>Om dan Tanta dong isi di yang warna putih ee…. Kalau yang merah tu JANGAN !!!</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePreview}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Lihat Format PDF & Cetak</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          {/* Main Excel Input Table */}
          <div className="border-2 border-slate-800 divide-y-2 divide-slate-800 text-xs sm:text-sm font-sans">
            
            {/* ROW 1: NOMOR SPT & NOMOR SPPD */}
            <div className="grid grid-cols-12 divide-x-2 divide-slate-800">
              <div className="col-span-1 bg-slate-100 p-2.5 font-bold text-center flex items-center justify-center">
                1
              </div>
              <div className="col-span-3 bg-slate-100 p-2.5 font-bold space-y-3">
                <div>NOMOR SPT :</div>
                <div>NOMOR SPPD :</div>
                <div className="text-slate-600 font-mono text-xs">INDEKS SURAT :</div>
              </div>
              <div className="col-span-8 p-2.5 space-y-2 bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono">000.1.2.3/DPUPR-NGK/</span>
                  <input
                    type="text"
                    value={nomorSpt}
                    onChange={(e) => setNomorSpt(e.target.value)}
                    className="w-20 px-2 py-1 border border-slate-300 rounded font-bold text-center bg-white shadow-inner focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-slate-500 font-mono">/{indeksBulan}/{indeksTahun}</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs text-slate-500 mr-1">No. SPPD Awal:</span>
                  <input
                    type="number"
                    value={nomorSppdStart}
                    onChange={(e) => setNomorSppdStart(Number(e.target.value))}
                    className="w-16 px-2 py-1 border border-slate-300 rounded font-bold text-center bg-white shadow-inner"
                  />
                  <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono">
                    {activePersons.map((p, idx) => (
                      <span key={idx} className="bg-red-500 text-white font-bold px-2 py-0.5 rounded shadow-sm">
                        {nomorSppdStart + idx}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs pt-1 border-t border-slate-200">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-600">Indeks Bulan:</span>
                    <input
                      type="text"
                      value={indeksBulan}
                      onChange={(e) => setIndeksBulan(e.target.value)}
                      className="w-12 px-2 py-0.5 border border-slate-300 rounded font-bold text-center"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-600">Indeks Tahun:</span>
                    <input
                      type="text"
                      value={indeksTahun}
                      onChange={(e) => setIndeksTahun(e.target.value)}
                      className="w-16 px-2 py-0.5 border border-slate-300 rounded font-bold text-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2: NOMOR URUT PETUGAS */}
            <div className="grid grid-cols-12 divide-x-2 divide-slate-800">
              <div className="col-span-1 bg-slate-100 p-2.5 font-bold text-center flex items-center justify-center">
                2
              </div>
              <div className="col-span-3 bg-slate-100 p-2.5 font-bold space-y-1">
                <div>NOMOR URUT PETUGAS :</div>
                <div className="text-[11px] text-slate-500 font-normal">Isi Sesuai Nomor Urut Pegawai (1 s/d 15)</div>
              </div>
              <div className="col-span-8 p-2.5 bg-white space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {[
                    { label: 'Orang ke 1', val: person1, set: setPerson1 },
                    { label: 'Orang ke 2', val: person2, set: setPerson2 },
                    { label: 'Orang ke 3', val: person3, set: setPerson3 },
                    { label: 'Orang ke 4', val: person4, set: setPerson4 },
                    { label: 'Orang ke 5', val: person5, set: setPerson5 },
                    { label: 'Orang ke 6', val: person6, set: setPerson6 },
                  ].map((item, idx) => (
                    <div key={idx} className="border border-dashed border-slate-400 p-2 rounded text-center bg-slate-50">
                      <div className="text-[10px] text-slate-500 uppercase">{item.label}</div>
                      <select
                        value={item.val}
                        onChange={(e) => item.set(Number(e.target.value))}
                        className="w-full mt-1 px-1 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-center"
                      >
                        <option value={0}>- (Kosong)</option>
                        {employees.map(emp => (
                          <option key={emp.id} value={emp.noUrut}>
                            [{emp.noUrut}] {emp.name.split(',')[0]}
                          </option>
                        ))}
                      </select>
                      <div className="text-[9px] text-blue-800 font-semibold truncate mt-1">
                        {getEmpByNo(item.val)?.name || '-'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preview Personil List */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-700">Daftar Penerima Tugas (Otomatis dari Database Pegawai):</div>
                  {activePersons.map((p, i) => (
                    <div key={i} className="flex justify-between items-center text-slate-700 border-b border-slate-200 py-1 last:border-none">
                      <div>
                        <span className="font-bold mr-2">{i + 1}). {p.emp!.name}</span>
                        <span className="text-[11px] text-slate-500 font-mono mr-2">NIP. {p.emp!.nip}</span>
                        <span className="text-[11px] text-blue-700">({p.emp!.position})</span>
                      </div>
                      <span className="text-[10px] bg-red-100 text-red-800 font-mono px-2 py-0.5 rounded">
                        SPD: {p.spdNo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 3: MAKSUD PERJALANAN */}
            <div className="grid grid-cols-12 divide-x-2 divide-slate-800">
              <div className="col-span-1 bg-slate-100 p-2.5 font-bold text-center flex items-center justify-center">
                3
              </div>
              <div className="col-span-3 bg-slate-100 p-2.5 font-bold">
                MAKSUD PERJALANAN :
              </div>
              <div className="col-span-8 p-2.5 bg-white">
                <textarea
                  rows={2}
                  value={maksudPerjalanan}
                  onChange={(e) => setMaksudPerjalanan(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-sm bg-white shadow-inner focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* ROW 4: TEMPAT TUGAS */}
            <div className="grid grid-cols-12 divide-x-2 divide-slate-800">
              <div className="col-span-1 bg-slate-100 p-2.5 font-bold text-center flex items-center justify-center">
                4
              </div>
              <div className="col-span-3 bg-slate-100 p-2.5 font-bold space-y-4">
                <div>TEMPAT TUGAS :</div>
                <div className="text-[11px] text-slate-500 font-normal">
                  Diisi jika dilakukan perjalanan ke dua desa
                </div>
              </div>
              <div className="col-span-8 p-2.5 bg-white space-y-3">
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold block mb-0.5">Desa / Lokasi Tugas Utama:</label>
                  <input
                    type="text"
                    value={tempatTugas}
                    onChange={(e) => setTempatTugas(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded font-bold"
                  />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <div className="font-semibold text-xs text-slate-700">Tujuan Kunjungan Desa Kedua (Untuk Lembar Pengesahan / Visum SPD):</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500 block">Nama Desa / Kecamatan:</label>
                      <input
                        type="text"
                        value={tempatTugas2}
                        onChange={(e) => setTempatTugas2(e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block">Jabatan Pejabat:</label>
                      <input
                        type="text"
                        value={jabatanPejabatDesa2}
                        onChange={(e) => setJabatanPejabatDesa2(e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block">Nama Pejabat Desa:</label>
                      <input
                        type="text"
                        value={namaPejabatDesa2}
                        onChange={(e) => setNamaPejabatDesa2(e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 5: LAMA PERJALANAN & TANGGAL */}
            <div className="grid grid-cols-12 divide-x-2 divide-slate-800">
              <div className="col-span-1 bg-slate-100 p-2.5 font-bold text-center flex items-center justify-center">
                5
              </div>
              <div className="col-span-3 bg-slate-100 p-2.5 font-bold space-y-2">
                <div>LAMA PERJALANAN :</div>
                <div>TANGGAL BERANGKAT :</div>
                <div>TANGGAL KEMBALI :</div>
              </div>
              <div className="col-span-8 p-2.5 bg-white space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={lamaPerjalanan}
                    onChange={(e) => setLamaPerjalanan(Number(e.target.value))}
                    className="w-16 px-2 py-1 border border-slate-300 rounded font-bold text-center"
                  />
                  <span className="font-bold">Hari</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-xs text-slate-500 block">Tanggal Berangkat:</span>
                    <input
                      type="text"
                      value={tanggalBerangkat}
                      onChange={(e) => setTanggalBerangkat(e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-xs"
                      placeholder="14 July 2026"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Tanggal Harus Kembali:</span>
                    <input
                      type="text"
                      value={tanggalKembali}
                      onChange={(e) => setTanggalKembali(e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-xs"
                      placeholder="14 July 2026"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 6: ALAT ANGKUT */}
            <div className="grid grid-cols-12 divide-x-2 divide-slate-800">
              <div className="col-span-1 bg-slate-100 p-2.5 font-bold text-center flex items-center justify-center">
                6
              </div>
              <div className="col-span-3 bg-slate-100 p-2.5 font-bold">
                ALAT ANGKUT YANG DIGUNAKAN :
              </div>
              <div className="col-span-8 p-2.5 bg-white">
                <select
                  value={alatAngkut}
                  onChange={(e) => setAlatAngkut(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded font-semibold text-xs sm:text-sm"
                >
                  <option value="Kendaraan Pribadi">Kendaraan Pribadi</option>
                  <option value="Kendaraan Dinas">Kendaraan Dinas</option>
                  <option value="Kendaraan Umum/Bus">Kendaraan Umum/Bus</option>
                  <option value="Pesawat Udara">Pesawat Udara</option>
                </select>
              </div>
            </div>

            {/* ROW 7 & 8: TANGGAL PENANDATANGANAN & PEJABAT */}
            <div className="grid grid-cols-12 divide-x-2 divide-slate-800">
              <div className="col-span-1 bg-slate-100 p-2.5 font-bold text-center flex items-center justify-center">
                7, 8
              </div>
              <div className="col-span-3 bg-slate-100 p-2.5 font-bold space-y-3">
                <div>TANGGAL PENANDATANGANAN :</div>
                <div>PEJABAT PENANDATANGAN :</div>
              </div>
              <div className="col-span-8 p-2.5 bg-white space-y-2">
                <input
                  type="text"
                  value={tanggalTtd}
                  onChange={(e) => setTanggalTtd(e.target.value)}
                  className="w-full sm:w-64 px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                  placeholder="14 July 2026"
                />

                <div className="flex items-center gap-3 pt-1">
                  <select
                    value={pejabatTtdTipe}
                    onChange={(e) => setPejabatTtdTipe(Number(e.target.value) as 1 | 2)}
                    className="px-3 py-1.5 border border-slate-300 rounded font-bold text-xs"
                  >
                    <option value={1}>1 - KEPALA DINAS (SYARIFUDIN IBRAHIM, ST)</option>
                    <option value={2}>2 - SEKRETARIS DINAS (ANSELMUS MERE, SE)</option>
                  </select>
                  <span className="text-[11px] text-slate-500 italic">
                    (Angka 1 untuk Kadis dan 2 untuk Sekretaris)
                  </span>
                </div>
              </div>
            </div>

            {/* ROW 9, 10, 11, 12: MATA ANGGARAN & SUMBER DANA */}
            <div className="grid grid-cols-12 divide-x-2 divide-slate-800">
              <div className="col-span-1 bg-slate-100 p-2.5 font-bold text-center flex items-center justify-center">
                9-12
              </div>
              <div className="col-span-3 bg-slate-100 p-2.5 font-bold space-y-2">
                <div>MATA ANGGARAN :</div>
                <div>KODE RUP :</div>
                <div>NAMA BIDANG :</div>
                <div>SUMBER DANA :</div>
              </div>
              <div className="col-span-8 p-2.5 bg-white space-y-2">
                <input
                  type="text"
                  value={mataAnggaran}
                  onChange={(e) => setMataAnggaran(e.target.value)}
                  className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-xs font-bold text-blue-900"
                  placeholder="1.03.02.2.02.0002.5.1.02.04.001.00003"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Kode RUP:</span>
                    <input
                      type="text"
                      value={kodeRup}
                      onChange={(e) => setKodeRup(e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Nama Bidang:</span>
                    <input
                      type="text"
                      value={namaBidang}
                      onChange={(e) => setNamaBidang(e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-bold text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Sumber Dana:</span>
                    <input
                      type="text"
                      value={sumberDana}
                      onChange={(e) => setSumberDana(e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 13: BIAYA / DAFTAR BAYAR KOLEKTIF */}
            <div className="grid grid-cols-12 divide-x-2 divide-slate-800 bg-slate-50">
              <div className="col-span-1 bg-slate-100 p-2.5 font-bold text-center flex items-center justify-center">
                13
              </div>
              <div className="col-span-3 bg-slate-100 p-2.5 font-bold">
                STANDAR BIAYA PER ORANG :
              </div>
              <div className="col-span-8 p-2.5 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold">Uang Harian / Hari (Rp):</span>
                    <input
                      type="number"
                      value={biayaPerHari}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setBiayaPerHari(v);
                        setTotalPerPerson((v * 2) + transportPP);
                      }}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold">Transport PP (Rp):</span>
                    <input
                      type="number"
                      value={transportPP}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setTransportPP(v);
                        setTotalPerPerson((biayaPerHari * 2) + v);
                      }}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold">Total per Petugas (Rp):</span>
                    <input
                      type="number"
                      value={totalPerPerson}
                      onChange={(e) => setTotalPerPerson(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-extrabold text-blue-900 bg-blue-50"
                    />
                  </div>
                </div>
                <div className="text-[11px] text-slate-600 mt-2 font-semibold">
                  Total Pembayaran Kolektif: <span className="text-blue-900 font-extrabold text-sm">Rp {(totalPerPerson * activePersons.length).toLocaleString('id-ID')}</span> untuk {activePersons.length} orang petugas.
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500 italic">
              Data yang Anda input akan langsung memformat SPT, seluruh lembar SPD personil, Kwitansi, Daftar Bayar Kolektif, dan Laporan.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Simpan Isian Data</span>
              </button>
              <button
                type="button"
                onClick={handlePreview}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Buka Preview Dokumen Resmi (PDF)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
