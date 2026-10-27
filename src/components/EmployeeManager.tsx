import React, { useState } from 'react';
import { Users, Plus, Edit3, Trash2, Shield, Phone, Award } from 'lucide-react';
import { Employee } from '../types';

interface EmployeeManagerProps {
  employees: Employee[];
  onAddEmployee: (emp: Employee) => void;
  onUpdateEmployee: (emp: Employee) => void;
  onDeleteEmployee: (id: string) => void;
}

export const EmployeeManager: React.FC<EmployeeManagerProps> = ({
  employees,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);

  const [nip, setNip] = useState('');
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');
  const [position, setPosition] = useState('');
  const [groupLevel, setGroupLevel] = useState('III');
  const [phone, setPhone] = useState('');

  const handleOpenAdd = () => {
    setEditingEmp(null);
    setNip('');
    setName('');
    setRank('Pembina (IV/a)');
    setPosition('Staf Bidang SDA');
    setGroupLevel('IV');
    setPhone('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditingEmp(emp);
    setNip(emp.nip);
    setName(emp.name);
    setRank(emp.rank);
    setPosition(emp.position);
    setGroupLevel(emp.groupLevel);
    setPhone(emp.phone || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const empData: Employee = {
      id: editingEmp ? editingEmp.id : `emp-${Date.now()}`,
      nip,
      name,
      rank,
      position,
      groupLevel,
      phone
    };

    if (editingEmp) {
      onUpdateEmployee(empData);
    } else {
      onAddEmployee(empData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Data Pegawai Bidang Sumber Daya Air</h2>
          <p className="text-xs text-slate-500">Daftar pejabat struktural, fungsional, dan staf pelaksana teknis Dinas PUPR Kab. Nagekeo</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pegawai Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                  Gol. {emp.groupLevel}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{emp.name}</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">NIP. {emp.nip}</p>
              </div>
              <div className="space-y-1 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{emp.position}</span>
                </div>
                <div>{emp.rank}</div>
                {emp.phone && (
                  <div className="flex items-center gap-1.5 text-slate-500 pt-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{emp.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-slate-100">
              <button
                onClick={() => handleOpenEdit(emp)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDeleteEmployee(emp.id)}
                className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingEmp ? 'Edit Data Pegawai' : 'Tambah Pegawai Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ir. Yohanes da Silva, M.T."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">NIP (Nomor Induk Pegawai)</label>
                <input
                  type="text"
                  required
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="19750814 200501 1 008"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pangkat / Golongan</label>
                  <input
                    type="text"
                    required
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    placeholder="Pembina Tingkat I (IV/b)"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Golongan Ruang</label>
                  <select
                    value={groupLevel}
                    onChange={(e) => setGroupLevel(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="IV">Golongan IV</option>
                    <option value="III">Golongan III</option>
                    <option value="II">Golongan II</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jabatan dalam Dinas</label>
                <input
                  type="text"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Kepala Bidang Sumber Daya Air"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nomor Telepon / WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
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
                  {editingEmp ? 'Simpan Perubahan' : 'Simpan Pegawai'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
