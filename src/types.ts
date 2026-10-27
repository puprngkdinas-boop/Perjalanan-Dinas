export interface Employee {
  id: string;
  nip: string;
  name: string;
  rank: string; // e.g. "Pembina Utama Muda (IV/c)"
  position: string; // e.g. "Kepala Bidang Sumber Daya Air"
  groupLevel: string; // e.g. "IV"
  phone?: string;
}

export interface Activity {
  id: string;
  code: string; // e.g. "5.1.02.04.01.0001"
  name: string; // e.g. "Pekerjaan Operasi dan Pemeliharaan Jaringan Irigasi D.I. Mbay"
  pagu: number; // Pagu Anggaran
  year: string; // e.g. "2026"
  realized: number; // Realisasi berjalan
}

export type TripStatus = 'Draft' | 'Disetujui' | 'Berlangsung' | 'Selesai' | 'Laporan Masuk';

export interface Trip {
  id: string;
  sptNumber: string; // e.g. "090/SDA-PUPR/IV/2026"
  spdNumber: string; // e.g. "027/SPD/SDA-PUPR/IV/2026"
  employeeId: string; // Pelaksana utama
  companionIds?: string[]; // Pengikut / Anggota Tim
  activityId: string; // Kode MAK / Kegiatan
  destination: string; // e.g. "Kec. Aesesa / Bendung Sutami"
  purpose: string; // e.g. "Inspeksi Teknis Saluran Primer Irigasi Mbay Kiri"
  startDate: string;
  endDate: string;
  durationDays: number;
  transportType: 'Kendaraan Dinas' | 'Kendaraan Umum/Bus' | 'Pesawat Udara' | 'Kendaraan Pribadi';
  vehicleDetails?: string; // e.g. "Mobil Dinas Pick Up Hilux EB 8101 E"
  accommodationType: 'Hotel / Penginapan' | 'Lumpsum / Biaya Sendiri';
  perDiemRate: number; // Uang harian per hari (e.g. 450000)
  transportCost: number; // Biaya transport riil
  lodgingCost: number; // Biaya penginapan per malam / total
  representationCost?: number; // Uang representasi (jika eselon II/III)
  totalCost: number;
  status: TripStatus;
  approverName: string; // e.g. "Ir. Yulius da Silva, M.T."
  approverNip: string;
  approverPosition: string; // e.g. "Kepala Dinas PUPR Kab. Nagekeo"
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

export interface DashboardStats {
  totalTrips: number;
  activeTrips: number;
  totalBudget: number;
  realizedBudget: number;
  pendingReports: number;
}
