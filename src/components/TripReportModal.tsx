import React, { useState } from 'react';
import { FileText, X, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Trip, TripReport, Employee, Activity } from '../types';

interface TripReportModalProps {
  trip: Trip;
  employees: Employee[];
  activities: Activity[];
  existingReport?: TripReport;
  onSaveReport: (report: TripReport) => void;
  onClose: () => void;
}

export const TripReportModal: React.FC<TripReportModalProps> = ({
  trip,
  employees,
  activities,
  existingReport,
  onSaveReport,
  onClose
}) => {
  const employee = employees.find(e => e.id === trip.employeeId);
  const activity = activities.find(a => a.id === trip.activityId);

  const [summary, setSummary] = useState(existingReport?.summary || '');
  const [findings, setFindings] = useState<string[]>(
    existingReport?.findings || [
      'Pekerjaan di lapangan berjalan sesuai dengan spesifikasi teknis.',
      'Koordinasi dengan pihak desa dan kelompok pemakai air berjalan lancar.'
    ]
  );
  const [recommendations, setRecommendations] = useState<string[]>(
    existingReport?.recommendations || [
      'Dilakukan monitoring lanjutan secara berkala.',
      'Penyedia jasa diminta mempercepat progres fisik sesuai tenggat waktu.'
    ]
  );
  const [newFinding, setNewFinding] = useState('');
  const [newRec, setNewRec] = useState('');

  const handleAddFinding = () => {
    if (!newFinding.trim()) return;
    setFindings([...findings, newFinding.trim()]);
    setNewFinding('');
  };

  const handleRemoveFinding = (index: number) => {
    setFindings(findings.filter((_, i) => i !== index));
  };

  const handleAddRec = () => {
    if (!newRec.trim()) return;
    setRecommendations([...recommendations, newRec.trim()]);
    setNewRec('');
  };

  const handleRemoveRec = (index: number) => {
    setRecommendations(recommendations.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reportData: TripReport = {
      id: existingReport ? existingReport.id : `rep-${Date.now()}`,
      tripId: trip.id,
      summary,
      findings,
      recommendations,
      photos: existingReport?.photos || [
        'https://images.unsplash.com/photo-1541888946425-d0fbb18f191d?auto=format&fit=crop&q=80&w=800'
      ],
      submittedAt: new Date().toISOString().split('T')[0]
    };
    onSaveReport(reportData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Laporan Hasil Perjalanan Dinas</h3>
              <p className="text-xs text-slate-500 font-mono">SPT: {trip.sptNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
            <p><span className="font-semibold">Pelaksana:</span> {employee?.name} ({employee?.position})</p>
            <p><span className="font-semibold">Tujuan:</span> {trip.destination}</p>
            <p><span className="font-semibold">Keperluan:</span> {trip.purpose}</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ringkasan Eksekutif Pelaksanaan</label>
            <textarea
              required
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Ringkasan hasil kunjungan lapangan..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Temuan & Catatan Lapangan</label>
            <div className="space-y-2 mb-2">
              {findings.map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs">
                  <span>{i + 1}. {f}</span>
                  <button type="button" onClick={() => handleRemoveFinding(i)} className="text-rose-500 hover:text-rose-700">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newFinding}
                onChange={(e) => setNewFinding(e.target.value)}
                placeholder="Tambah temuan baru..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddFinding}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Tambah
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rekomendasi Tindak Lanjut</label>
            <div className="space-y-2 mb-2">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs">
                  <span>{i + 1}. {rec}</span>
                  <button type="button" onClick={() => handleRemoveRec(i)} className="text-rose-500 hover:text-rose-700">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newRec}
                onChange={(e) => setNewRec(e.target.value)}
                placeholder="Tambah rekomendasi baru..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddRec}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Tambah
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan & Terbitkan Laporan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
