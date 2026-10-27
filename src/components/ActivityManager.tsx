import React, { useState } from 'react';
import { Briefcase, Plus, Edit3, Trash2, DollarSign, TrendingUp } from 'lucide-react';
import { Activity } from '../types';

interface ActivityManagerProps {
  activities: Activity[];
  onAddActivity: (act: Activity) => void;
  onUpdateActivity: (act: Activity) => void;
  onDeleteActivity: (id: string) => void;
}

export const ActivityManager: React.FC<ActivityManagerProps> = ({
  activities,
  onAddActivity,
  onUpdateActivity,
  onDeleteActivity
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAct, setEditingAct] = useState<Activity | null>(null);

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [pagu, setPagu] = useState<number>(500000000);
  const [realized, setRealized] = useState<number>(0);
  const [year, setYear] = useState('2026');

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const handleOpenAdd = () => {
    setEditingAct(null);
    setCode('1.03.02.2.01.000');
    setName('');
    setPagu(500000000);
    setRealized(0);
    setYear('2026');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (act: Activity) => {
    setEditingAct(act);
    setCode(act.code);
    setName(act.name);
    setPagu(act.pagu);
    setRealized(act.realized);
    setYear(act.year);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const actData: Activity = {
      id: editingAct ? editingAct.id : `act-${Date.now()}`,
      code,
      name,
      pagu,
      realized,
      year
    };

    if (editingAct) {
      onUpdateActivity(actData);
    } else {
      onAddActivity(actData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Kegiatan & Anggaran (DPA / MAK)</h2>
          <p className="text-xs text-slate-500">Kelola mata anggaran kegiatan, pagu dana, dan realisasi belanja Bidang Sumber Daya Air</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kegiatan DPA</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activities.map((act) => {
          const pct = act.pagu > 0 ? Math.round((act.realized / act.pagu) * 100) : 0;
          return (
            <div key={act.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      MAK: {act.code}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">{act.name}</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Realisasi Anggaran</span>
                  <span className="text-blue-900">{pct}% ({formatIDR(act.realized)})</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 pt-1">
                  <span>Pagu Anggaran: {formatIDR(act.pagu)}</span>
                  <span>Sisa: {formatIDR(act.pagu - act.realized)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-500">Tahun Anggaran {act.year}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(act)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteActivity(act.id)}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingAct ? 'Edit Kegiatan DPA' : 'Tambah Kegiatan DPA Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kode Rekening / MAK</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="1.03.02.2.01.0001"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Kegiatan DPA</label>
                <textarea
                  required
                  rows={3}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Pembangunan Jaringan Irigasi Permukaan..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pagu Anggaran (Rp)</label>
                  <input
                    type="number"
                    required
                    value={pagu}
                    onChange={(e) => setPagu(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Realisasi Berjalan (Rp)</label>
                  <input
                    type="number"
                    required
                    value={realized}
                    onChange={(e) => setRealized(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tahun Anggaran</label>
                <input
                  type="text"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
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
                  {editingAct ? 'Simpan Perubahan' : 'Simpan Kegiatan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
