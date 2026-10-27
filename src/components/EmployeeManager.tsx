import React, { useState } from 'react';
import { Users, Plus, Edit3, Trash2, Award, CreditCard, Search } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);

  const [noUrut, setNoUrut] = useState(employees.length + 1);
  const [name, setName] = useState('');
  const [nip, setNip] = useState('');
  const [rank, setRank] = useState('Penata Muda TK.I-III/b');
  const [position, setPosition] = useState('Analis Pengelolaan Sumber Daya Air');
  const [tingkat, setTingkat] = useState<'C' | 'D' | 'E' | 'F'>('E');
  const [npwp, setNpwp] = useState('');
  const [noRekening, setNoRekening] = useState('');
  const [bank, setBank] = useState('BANK NTT CAB.MBAY');

  const handleOpenAdd = () => {
    setEditingEmp(null);
    setNoUrut(employees.length + 1);
    setName('');
    setNip('');
    setRank('Penata Muda-III/a');
    setPosition('Staf Bidang Sumber Daya Air');
    setTingkat('E');
    setNpwp('');
    setNoRekening('');
    setBank('BANK NTT CAB.MBAY');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditingEmp(emp);
    setNoUrut(emp.noUrut);
    setName(emp.name);
    setNip(emp.nip);
    setRank(emp.rank);
    setPosition(emp.position);
    setTingkat(emp.tingkat);
    setNpwp(emp.npwp || '');
    setNoRekening(emp.noRekening || '');
    setBank(emp.bank || 'BANK NTT CAB.MBAY');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const empData: Employee = {
      id: editingEmp ? editingEmp.id : `emp-${Date.now()}`,
      noUrut,
      name,
      nip,
      rank,
      position,
      tingkat,
      npwp,
      noRekening,
      bank
    };

    if (editingEmp) {
      onUpdateEmployee(empData);
    } else {
      onAddEmployee(empData);
    }
    setIsModalOpen(false);
  };

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Daftar ASN Dinas PUPR Kabupaten Nagekeo
          </h2>
          <p className="text-xs text-slate-500">
            Database lengkap NIP, Pangkat/Golongan, Jabatan, Tingkat SPD, NPWP, dan No. Rekening Bank NTT
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pegawai Baru</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari Nama Pegawai, NIP, atau Jabatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Total: {employees.length} Pegawai
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-3 text-center w-12">No. Urut</th>
                <th className="py-3.5 px-4">Nama Pegawai & NIP</th>
                <th className="py-3.5 px-4">Pangkat / Golongan</th>
                <th className="py-3.5 px-4">Jabatan</th>
                <th className="py-3.5 px-3 text-center">Tingkat SPD</th>
                <th className="py-3.5 px-4">No. Rekening Bank NTT</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-3 text-center font-bold text-slate-900 bg-slate-50/50">
                    [{emp.noUrut}]
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{emp.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">NIP. {emp.nip}</div>
                    {emp.npwp && (
                      <div className="text-[10px] text-slate-400 font-mono">NPWP: {emp.npwp}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {emp.rank}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {emp.position}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded font-bold text-xs bg-blue-100 text-blue-800">
                      Tingkat {emp.tingkat}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700">
                    <div>{emp.noRekening || '-'}</div>
                    <div className="text-[10px] text-slate-400 font-sans">{emp.bank}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(emp)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded-lg inline-flex cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteEmployee(emp.id)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg inline-flex cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingEmp ? 'Edit Data Pegawai' : 'Tambah Pegawai Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">No. Urut Excel</label>
                  <input
                    type="number"
                    required
                    value={noUrut}
                    onChange={(e) => setNoUrut(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-center"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 uppercase mb-1">Tingkat Perjalanan Dinas</label>
                  <select
                    value={tingkat}
                    onChange={(e) => setTingkat(e.target.value as any)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  >
                    <option value="C">Tingkat C (Kepala Dinas)</option>
                    <option value="D">Tingkat D (Sekretaris / Kabid)</option>
                    <option value="E">Tingkat E (Pejabat Fungsional / Analis / Staf)</option>
                    <option value="F">Tingkat F (Juru / Pengelola Lapangan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="PAULUS MENGGOTU SOGEN, ST"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">NIP (Nomor Induk Pegawai)</label>
                <input
                  type="text"
                  required
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="199110192019031011"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Pangkat & Golongan</label>
                  <input
                    type="text"
                    required
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    placeholder="Penata Muda TK.I-III/b"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">NPWP</label>
                  <input
                    type="text"
                    value={npwp}
                    onChange={(e) => setNpwp(e.target.value)}
                    placeholder="73.861.106.0-923.000"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Jabatan dalam Dinas</label>
                <input
                  type="text"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Analis Pengelolaan Sumber Daya Air"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Nomor Rekening Bank</label>
                  <input
                    type="text"
                    value={noRekening}
                    onChange={(e) => setNoRekening(e.target.value)}
                    placeholder="040 02.06.003898-8"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Nama Bank</label>
                  <input
                    type="text"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    placeholder="BANK NTT CAB.MBAY"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md cursor-pointer"
                >
                  Simpan Pegawai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
