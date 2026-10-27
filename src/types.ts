export interface Employee {
  id: string;
  noUrut: number;
  name: string;
  nip: string;
  rank: string; // Pangkat & Golongan, e.g. "Pembina Utama Muda - IV/c", "Penata Muda TK.I-III/b"
  position: string; // Jabatan, e.g. "Analis Pengelolaan Sumber Daya Air"
  tingkat: 'C' | 'D' | 'E' | 'F'; // Tingkat menurut perjalanan dinas
  npwp?: string;
  noRekening?: string;
  bank?: string; // e.g. "BANK NTT CAB.MBAY"
}

export interface Activity {
  id: string;
  code: string; // e.g. "1.03.02.2.02.0002.5.1.02.04.001.00003"
  name: string; // e.g. "Operasi dan Pemeliharaan (O&P) Jaringan Irigasi Kewenangan Kabupaten"
  pagu: number;
  year: string;
  realized: number;
  kodeRup?: string; // e.g. "28797272"
  sumberDana?: string; // e.g. "Pendapatan transfer antar Daerah"
}

export type TripStatus = 'Draft' | 'Disetujui' | 'Berlangsung' | 'Selesai' | 'Laporan Masuk';

export interface TripPersonnel {
  employeeId: string;
  spdNumber: string; // e.g. "000.1.2.3/DPUPR-NGK/702/06/2026"
  sptNumber: string; // e.g. "000.1.2.3/DPUPR-NGK/701/06/2026"
  jmlHari: number;
  biayaHari: number; // e.g. 170000
  transportPP: number; // e.g. 60000
  total: number; // e.g. 400000
}

export interface Trip {
  id: string;
  sptRawNo: string; // e.g. "701"
  sptNumber: string; // e.g. "000.1.2.3/DPUPR-NGK/701/06/2026"
  spdStartNo: number; // e.g. 702
  indeksBulan: string; // e.g. "06"
  indeksTahun: string; // e.g. "2026"
  
  // Pegawai yang ditugaskan (urutan 1..n)
  personnel: TripPersonnel[];
  
  maksudPerjalanan: string;
  tempatTugas: string; // Desa/Kecamatan 1 (e.g. "Desa Nggolombai")
  
  // Desa ke-2 (jika ada kunjungan lanjutan)
  tempatTugas2?: string; // e.g. "Desa Tendatoto"
  namaPejabatDesa2?: string; // e.g. "Albertus Dae"
  jabatanPejabatDesa2?: string; // e.g. "Kepala Desa Tendatoto"
  
  lamaPerjalanan: number; // hari
  tanggalBerangkat: string; // e.g. "14 July 2026" or "2026-07-14"
  tanggalKembali: string; // e.g. "14 July 2026"
  tanggalPenandatanganan: string;
  tanggalLaporan?: string;
  tanggalKwitansi?: string;

  alatAngkut: string; // e.g. "Kendaraan Pribadi"
  tempatBerangkat: string; // "Mbay"
  
  // Pembebanan Anggaran
  pejabatPemberiTugas: string; // "Pengguna Anggaran"
  pembebananAnggaran: string; // "DPA Dinas Pekerjaan Umum Dan Penataan Ruang"
  mataAnggaran: string; // "1.03.02.2.02.0002.5.1.02.04.001.00003"
  kodeRup: string; // "28797272"
  namaBidang: string; // "Sumber Daya Air"
  sumberDana: string; // "Pendapatan transfer antar Daerah"

  // Pejabat
  pejabatPenandatanganTipe: 1 | 2; // 1: Kadis, 2: Sekretaris
  kadisName: string; // "SYARIFUDIN IBRAHIM, ST"
  kadisNip: string; // "196811021997031008"
  kadisPangkat: string; // "Pembina Utama Muda - IV/c"
  
  sekretarisName: string; // "ANSELMUS MERE, SE"
  sekretarisNip: string; // "197404132009011007"
  
  bendaharaName: string; // "FLORENTINA WONGA"
  bendaharaNip: string; // "19780822200312 2 006"

  pptkName: string; // "ANSELMUS MERE, SE"
  pptkNip: string; // "197404132009011007"

  // Laporan & Hasil Lapangan
  status: TripStatus;
  hasilPerjalananDinas?: string;
  hasilTemuan?: string[];
  usulSaran?: string;
  visualPhotos?: { url: string; caption: string }[];
  
  createdAt: string;
}

export interface TripReport {
  id: string;
  tripId: string;
  summary: string;
  findings: string[];
  recommendations: string[];
  photos: string[];
  submittedAt: string;
}
