import { Employee, Activity, Trip } from './types';

export const initialEmployees: Employee[] = [
  {
    id: 'emp-1',
    noUrut: 1,
    name: 'SYARIFUDIN IBRAHIM, ST',
    nip: '196811021997031008',
    rank: 'Pembina Utama Muda - IV/c',
    position: 'Kepala Dinas Pekerjaan Umum dan Penataan Ruang',
    tingkat: 'C',
    npwp: '16.348.195.5-923.000',
    noRekening: '040 02.06.000050-1',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-2',
    noUrut: 2,
    name: 'ANSELMUS MERE, SE',
    nip: '197404132009011007',
    rank: 'Pembina-IV/b',
    position: 'Sekretaris',
    tingkat: 'D',
    npwp: '47.809.890.8-923.000',
    noRekening: '040 02.06.001439-1',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-3',
    noUrut: 3,
    name: 'ARIF HASAN AKUBA,ST',
    nip: '19791028 200804 1 002',
    rank: 'Pembina-IV/a',
    position: 'Kepala Bidang Sumber Daya Air',
    tingkat: 'D',
    npwp: '16.348.195.5-923.000',
    noRekening: '040 02.06.001554-1',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-4',
    noUrut: 4,
    name: 'YOHANES DONI, ST',
    nip: '198210092011011014',
    rank: 'Penata TK.I-III/d',
    position: 'Teknik Pengairan (Perencanaan Dan Pengendalian Sumber Daya Air)',
    tingkat: 'E',
    npwp: '89.389.041.8-923.000',
    noRekening: '040 02.06.003898-8',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-5',
    noUrut: 5,
    name: 'MUTHALIB ISMAIL,ST',
    nip: '198305152015031001',
    rank: 'Penata - III/c',
    position: 'JFT Operasi dan Pemeliharaan',
    tingkat: 'E',
    npwp: '73.417.292.7-923.000',
    noRekening: '040 02.06.001533-2',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-6',
    noUrut: 6,
    name: 'PAULUS MENGGOTU SOGEN, ST',
    nip: '199110192019031011',
    rank: 'Penata Muda TK.I-III/b',
    position: 'Analis Pengelolaan Sumber Daya Air',
    tingkat: 'E',
    npwp: '73.861.106.0-923.000',
    noRekening: '040 02.06.003898-8',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-7',
    noUrut: 7,
    name: 'SILWANUS LAISKODAT',
    nip: '196909262007011015',
    rank: 'Penata Muda-III/a',
    position: 'Pengamat Irigasi',
    tingkat: 'E',
    npwp: '47.809.888.2-923.000',
    noRekening: '040 02.06.001533-2',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-8',
    noUrut: 8,
    name: 'YOHANES BOSCO DEDO',
    nip: '198005192007011006',
    rank: 'Penata Muda-III/a',
    position: 'Pengelola Pemeliharaan Jaringan Irigasi',
    tingkat: 'E',
    npwp: '47.809.887.4-923.000',
    noRekening: '040 02.06.001552-6',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-9',
    noUrut: 9,
    name: 'FRANSISKUS X.A. WANGU',
    nip: '196910302007011016',
    rank: 'Juru TK.I-I/d',
    position: 'Pengelola Pemeliharaan Jaringan Irigasi',
    tingkat: 'F',
    npwp: '47.809.879.1-923.000',
    noRekening: '040 02.06.001534-4',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-10',
    noUrut: 10,
    name: 'MARIA YUNITHA EBU,ST',
    nip: '19900628 202506 2 002',
    rank: 'Penata Muda-III/a',
    position: 'Pengelolah Sumber Daya Air',
    tingkat: 'E',
    npwp: '93.961.369.1.923.000',
    noRekening: '2511305678',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-11',
    noUrut: 11,
    name: 'ILHAM RIFAIL,ST',
    nip: '198712062024211003',
    rank: 'Penata Muda - IX',
    position: 'Pengelolahan Sumber Daya Air Ahli Pratama',
    tingkat: 'E',
    npwp: '53.932.223.0.923.000',
    noRekening: '2508948223',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-12',
    noUrut: 12,
    name: 'HONORIUS RIWU TIWA, S.Sos',
    nip: '198709302025211102',
    rank: '-',
    position: 'Penata Layanan Operasional',
    tingkat: 'E',
    npwp: '63.698.595.4.923.000',
    noRekening: '2514269281',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-13',
    noUrut: 13,
    name: 'FLORENTINA WONGA',
    nip: '19780822200312 2 006',
    rank: 'Penata (III/c)',
    position: 'Bendahara Pengeluaran',
    tingkat: 'E',
    npwp: '16.239.276.5-923.000',
    noRekening: '040 02.06.001546-1',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-14',
    noUrut: 14,
    name: 'ROBERTUS RENA, ST',
    nip: '196910132005021001',
    rank: 'Pembina (IV/a)',
    position: 'Teknik Pengairan Ahli Madya',
    tingkat: 'D',
    npwp: '79.927.850.1-923.000',
    noRekening: '040 02.06.001139-9',
    bank: 'BANK NTT CAB.MBAY'
  },
  {
    id: 'emp-15',
    noUrut: 15,
    name: 'ARNOLDUS JANSEN TIBO,ST',
    nip: '198510042011011000',
    rank: 'Penata Tk. I (III/d)',
    position: 'Pengawas Teknis Irigasi',
    tingkat: 'E',
    npwp: '89.389.043.4-923.000',
    noRekening: '040 02.06.001557-5',
    bank: 'BANK NTT CAB.MBAY'
  }
];

export const initialActivities: Activity[] = [
  {
    id: 'act-1',
    code: '1.03.02.2.02.0002.5.1.02.04.001.00003',
    name: 'Operasi dan Pemeliharaan (O&P) Jaringan Irigasi Kewenangan Kabupaten',
    pagu: 850000000,
    year: '2026',
    realized: 310000000,
    kodeRup: '28797272',
    sumberDana: 'Pendapatan transfer antar Daerah'
  },
  {
    id: 'act-2',
    code: '1.03.02.2.01.0001.5.1.02.04.001.00001',
    name: 'Pembangunan Jaringan Irigasi Permukaan D.I. Mbay Kiri',
    pagu: 1450000000,
    year: '2026',
    realized: 620000000,
    kodeRup: '28798114',
    sumberDana: 'DAK Fisik Penugasan'
  },
  {
    id: 'act-3',
    code: '1.03.02.2.03.0004.5.1.02.04.001.00002',
    name: 'Penyusunan Dokumen Geolistrik dan Eksplorasi Air Tanah',
    pagu: 450000000,
    year: '2026',
    realized: 180000000,
    kodeRup: '28799501',
    sumberDana: 'Pendapatan transfer antar Daerah'
  }
];

export const initialTrips: Trip[] = [
  {
    id: 'trip-nagekeo-1',
    sptRawNo: '701',
    sptNumber: '000.1.2.3/DPUPR-NGK/701/06/2026',
    spdStartNo: 702,
    indeksBulan: '06',
    indeksTahun: '2026',
    personnel: [
      {
        employeeId: 'emp-6', // PAULUS MENGGOTU SOGEN, ST
        spdNumber: '000.1.2.3/DPUPR-NGK/702/06/2026',
        sptNumber: '000.1.2.3/DPUPR-NGK/701/06/2026',
        jmlHari: 2,
        biayaHari: 170000,
        transportPP: 60000,
        total: 400000
      },
      {
        employeeId: 'emp-11', // ILHAM RIFAIL,ST
        spdNumber: '000.1.2.3/DPUPR-NGK/703/06/2026',
        sptNumber: '000.1.2.3/DPUPR-NGK/701/06/2026',
        jmlHari: 2,
        biayaHari: 170000,
        transportPP: 60000,
        total: 400000
      },
      {
        employeeId: 'emp-7', // SILWANUS LAISKODAT
        spdNumber: '000.1.2.3/DPUPR-NGK/704/06/2026',
        sptNumber: '000.1.2.3/DPUPR-NGK/701/06/2026',
        jmlHari: 2,
        biayaHari: 170000,
        transportPP: 60000,
        total: 400000
      },
      {
        employeeId: 'emp-8', // YOHANES BOSCO DEDO
        spdNumber: '000.1.2.3/DPUPR-NGK/705/06/2026',
        sptNumber: '000.1.2.3/DPUPR-NGK/701/06/2026',
        jmlHari: 2,
        biayaHari: 170000,
        transportPP: 60000,
        total: 400000
      },
      {
        employeeId: 'emp-12', // HONORIUS RIWU TIWA, S.Sos
        spdNumber: '000.1.2.3/DPUPR-NGK/706/06/2026',
        sptNumber: '000.1.2.3/DPUPR-NGK/701/06/2026',
        jmlHari: 2,
        biayaHari: 170000,
        transportPP: 60000,
        total: 400000
      },
      {
        employeeId: 'emp-9', // FRANSISKUS X.A. WANGU
        spdNumber: '000.1.2.3/DPUPR-NGK/707/06/2026',
        sptNumber: '000.1.2.3/DPUPR-NGK/701/06/2026',
        jmlHari: 2,
        biayaHari: 170000,
        transportPP: 60000,
        total: 400000
      }
    ],
    maksudPerjalanan: 'Dalam Rangka Survey Geolistrik air tanah di Desa Nggolombay',
    tempatTugas: 'Desa Nggolombai',
    tempatTugas2: 'Desa Tendatoto',
    namaPejabatDesa2: 'Albertus Dae',
    jabatanPejabatDesa2: 'Kepala Desa Tendatoto',
    lamaPerjalanan: 1,
    tanggalBerangkat: '14 July 2026',
    tanggalKembali: '14 July 2026',
    tanggalPenandatanganan: '14 July 2026',
    tanggalLaporan: '16 July 2026',
    tanggalKwitansi: '14 July 2026',
    alatAngkut: 'Kendaraan Pribadi',
    tempatBerangkat: 'Mbay',
    pejabatPemberiTugas: 'Pengguna Anggaran',
    pembebananAnggaran: 'DPA Dinas Pekerjaan Umum Dan Penataan Ruang',
    mataAnggaran: '1.03.02.2.02.0002.5.1.02.04.001.00003',
    kodeRup: '28797272',
    namaBidang: 'Sumber Daya Air',
    sumberDana: 'Pendapatan transfer antar Daerah',
    pejabatPenandatanganTipe: 1,
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
        caption: '11.03.2026 10:36 - 8.64132, 121.45596 (Pemasangan kabel elektroda geolistrik)'
      },
      {
        url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800',
        caption: '11.03.2026 10:36 - 8.64125, 121.45596 (Pengukuran resistivitas batuan dan koordinat GPS)'
      },
      {
        url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800',
        caption: '11.03.2026 10:35 - 8.64139, 121.45589 (Diskusi teknis tim survey dengan perangkat desa)'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
        caption: '11.03.2026 10:35 - 8.64140, 121.45581 (Pemeriksaan akuifer air tanah dangkal di lokasi)'
      }
    ],
    createdAt: '14 July 2026'
  }
];
