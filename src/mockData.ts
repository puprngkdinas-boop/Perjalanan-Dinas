import { Employee, Activity, Trip, TripReport } from './types';

export const initialEmployees: Employee[] = [
  {
    id: 'emp-1',
    nip: '19750814 200501 1 008',
    name: 'Fransiskus Xaverius Watu, S.T., M.T.',
    rank: 'Pembina Tingkat I (IV/b)',
    position: 'Kepala Bidang Sumber Daya Air',
    groupLevel: 'IV',
    phone: '081234567890'
  },
  {
    id: 'emp-2',
    nip: '19820312 201001 2 004',
    name: 'Maria Goreti Bea, S.T.',
    rank: 'Pembina (IV/a)',
    position: 'Kepala Seksi Operasi dan Pemeliharaan',
    groupLevel: 'IV',
    phone: '081398765432'
  },
  {
    id: 'emp-3',
    nip: '19870520 201101 1 002',
    name: 'Marselinus Djawa, S.T.',
    rank: 'Penata Tk. I (III/d)',
    position: 'Kepala Seksi Pembangunan dan Rehabilitasi Jaringan',
    groupLevel: 'III',
    phone: '082145678901'
  },
  {
    id: 'emp-4',
    nip: '19901105 201503 1 003',
    name: 'Yohanes Baptista Nggai, A.Md.',
    rank: 'Penata Muda Tk. I (III/b)',
    position: 'Pengawas Teknis Jaringan Irigasi',
    groupLevel: 'III',
    phone: '085237890123'
  },
  {
    id: 'emp-5',
    nip: '19930718 201902 2 001',
    name: 'Theresia Eka Rasi, S.T.',
    rank: 'Penata Muda (III/a)',
    position: 'Teknis Tata Air dan Hidrologi',
    groupLevel: 'III',
    phone: '081234123412'
  },
  {
    id: 'emp-6',
    nip: '19881204 201402 1 005',
    name: 'Adrianus Woda, S.Sos.',
    rank: 'Penata (III/c)',
    position: 'Bendahara Pengeluaran Pembantu / Staf Administrasi',
    groupLevel: 'III',
    phone: '081333444555'
  }
];

export const initialActivities: Activity[] = [
  {
    id: 'act-1',
    code: '1.03.02.2.01.0001',
    name: 'Pembangunan Jaringan Irigasi Permukaan D.I. Mbay Kiri',
    pagu: 1250000000,
    year: '2026',
    realized: 450000000
  },
  {
    id: 'act-2',
    code: '1.03.02.2.01.0005',
    name: 'Rehabilitasi Jaringan Irigasi D.I. Aesesa Kabupaten Nagekeo',
    pagu: 850000000,
    year: '2026',
    realized: 320000000
  },
  {
    id: 'act-3',
    code: '1.03.02.2.02.0002',
    name: 'Operasi dan Pemeliharaan (O&P) Jaringan Irigasi Kewenangan Kabupaten',
    pagu: 600000000,
    year: '2026',
    realized: 280000000
  },
  {
    id: 'act-4',
    code: '1.03.02.2.03.0004',
    name: 'Penyusunan Dokumen Perencanaan Teknis (DED) Embung dan Bendung Kecil',
    pagu: 400000000,
    year: '2026',
    realized: 150000000
  },
  {
    id: 'act-5',
    code: '1.03.02.2.04.0001',
    name: 'Pengamanan Tebing Sungai dan Pengendalian Banjir Wilayah Mbay/Aesesa',
    pagu: 950000000,
    year: '2026',
    realized: 510000000
  }
];

export const initialTrips: Trip[] = [
  {
    id: 'trip-1',
    sptNumber: '090/SDA-PUPR/III/2026',
    spdNumber: '027/SPD/SDA-PUPR/III/2026',
    employeeId: 'emp-2', // Maria Goreti Bea
    companionIds: ['emp-4'], // Yohanes Baptista
    activityId: 'act-1', // Pembangunan D.I. Mbay Kiri
    destination: 'Kecamatan Aesesa (Desa Nangadhero & Aeramo)',
    purpose: 'Inspeksi berkala progres fisik pembangunan saluran sekunder D.I. Mbay Kiri bersama Tim Konsultan Pengawas.',
    startDate: '2026-03-10',
    endDate: '2026-03-13',
    durationDays: 4,
    transportType: 'Kendaraan Dinas',
    vehicleDetails: 'Mobil Hilux Double Cabin EB 8101 E',
    accommodationType: 'Hotel / Penginapan',
    perDiemRate: 450000,
    transportCost: 350000,
    lodgingCost: 600000, // per malam
    representationCost: 0,
    totalCost: 5550000, // (450 * 4 + 350 + 600*3) * 2 orang
    status: 'Laporan Masuk',
    approverName: 'Ir. Yulius da Silva, M.T.',
    approverNip: '19681231 199803 1 045',
    approverPosition: 'Kepala Dinas PUPR Kab. Nagekeo',
    createdAt: '2026-03-05'
  },
  {
    id: 'trip-2',
    sptNumber: '091/SDA-PUPR/IV/2026',
    spdNumber: '028/SPD/SDA-PUPR/IV/2026',
    employeeId: 'emp-3', // Marselinus Djawa
    companionIds: ['emp-5'], // Theresia Eka
    activityId: 'act-3', // O&P Jaringan Irigasi
    destination: 'Kecamatan Boawae (D.I. Lowo Bea & D.I. Keo Tengah)',
    purpose: 'Pengukuran lapangan dan inventarisasi kerusakan pintu air akibat banjir bandang musim hujan.',
    startDate: '2026-04-05',
    endDate: '2026-04-08',
    durationDays: 4,
    transportType: 'Kendaraan Dinas',
    vehicleDetails: 'Mobil Operasional Strada Triton EB 8104 E',
    accommodationType: 'Hotel / Penginapan',
    perDiemRate: 450000,
    transportCost: 500000,
    lodgingCost: 550000,
    totalCost: 5300000,
    status: 'Selesai',
    approverName: 'Ir. Yulius da Silva, M.T.',
    approverNip: '19681231 199803 1 045',
    approverPosition: 'Kepala Dinas PUPR Kab. Nagekeo',
    createdAt: '2026-04-01'
  },
  {
    id: 'trip-3',
    sptNumber: '092/SDA-PUPR/IV/2026',
    spdNumber: '029/SPD/SDA-PUPR/IV/2026',
    employeeId: 'emp-1', // Fransiskus Xaverius
    activityId: 'act-4', // DED Embung
    destination: 'Kecamatan Mauponggo (Desa Woewulu)',
    purpose: 'Koordinasi lintas sektoral dengan Pemerintah Kecamatan dan Tokoh Masyarakat terkait rencana lokasi pembangunan Embung Pertanian.',
    startDate: '2026-04-18',
    endDate: '2026-04-20',
    durationDays: 3,
    transportType: 'Kendaraan Dinas',
    vehicleDetails: 'Mobil Dinas Fortuner EB 1234 A',
    accommodationType: 'Hotel / Penginapan',
    perDiemRate: 530000, // Eselon III
    transportCost: 400000,
    lodgingCost: 750000,
    representationCost: 150000,
    totalCost: 4040000,
    status: 'Berlangsung',
    approverName: 'Ir. Yulius da Silva, M.T.',
    approverNip: '19681231 199803 1 045',
    approverPosition: 'Kepala Dinas PUPR Kab. Nagekeo',
    createdAt: '2026-04-14'
  },
  {
    id: 'trip-4',
    sptNumber: '093/SDA-PUPR/IV/2026',
    spdNumber: '030/SPD/SDA-PUPR/IV/2026',
    employeeId: 'emp-4', // Yohanes Baptista
    activityId: 'act-5', // Pengamanan Tebing Sungai
    destination: 'Kecamatan Aesesa (Aliran Sungai Aesesa Sisi Timur)',
    purpose: 'Monitoring pemasangan kawat bronjong penahan tebing sungai untuk mengamankan permukiman warga.',
    startDate: '2026-04-25',
    endDate: '2026-04-27',
    durationDays: 3,
    transportType: 'Kendaraan Dinas',
    vehicleDetails: 'Motor Dinas Trail CRF 150L EB 2456 E',
    accommodationType: 'Lumpsum / Biaya Sendiri',
    perDiemRate: 430000,
    transportCost: 150000,
    lodgingCost: 0,
    totalCost: 1440000,
    status: 'Disetujui',
    approverName: 'Fransiskus Xaverius Watu, S.T., M.T.',
    approverNip: '19750814 200501 1 008',
    approverPosition: 'Kabid Sumber Daya Air (An. Kepala Dinas)',
    createdAt: '2026-04-20'
  }
];

export const initialReports: TripReport[] = [
  {
    id: 'rep-1',
    tripId: 'trip-1',
    summary: 'Inspeksi lapangan D.I. Mbay Kiri menunjukkan progres fisik pekerjaan saluran primer telah mencapai 68.5%. Kualitas beton precast sesuai dengan spesifikasi teknis.',
    findings: [
      'Pekerjaan galian tanah dan pemasangan saluran u-ditch di Blok Nangadhero berjalan lancar.',
      'Terdapat kendala kecil pada titik STA 12+400 akibat batuan besar yang memerlukan demolisi ringan.',
      'Kontraktor pelaksana telah mematuhi K3 Konstruksi dengan penggunaan APD lengkap.'
    ],
    recommendations: [
      'Meminta penyedia jasa untuk menambah satu unit excavator breaker guna mempercepat pemecahan batu di STA 12+400.',
      'Melakukan Mutual Check 0+ (MC-0) lanjutan jika ada penyesuaian trase.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18f191d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800'
    ],
    submittedAt: '2026-03-14'
  },
  {
    id: 'rep-2',
    tripId: 'trip-2',
    summary: 'Pengukuran dan inventarisasi kerusakan D.I. Lowo Bea Boawae pasca banjir bandang mencakup 3 bendung desa dan 1.200 meter saluran tersier terdampak.',
    findings: [
      'Sayap bendung sisi kiri mengalami abrasi sepanjang 8 meter.',
      'Endapan lumpur setinggi 60 cm memenuhi kantong lumpur (sand trap).'
    ],
    recommendations: [
      'Segera diusulkan penanganan darurat melalui dana belanja tak terduga atau pergeseran anggaran pemeliharaan rutin.',
      'Melibatkan Kelompok P3A (Perkumpulan Petani Pemakai Air) untuk gotong royong pembersihan sedimen.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800'
    ],
    submittedAt: '2026-04-09'
  }
];
