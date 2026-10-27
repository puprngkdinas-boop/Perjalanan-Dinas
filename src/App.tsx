import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ExcelFormatForm } from './components/ExcelFormatForm';
import { TripList } from './components/TripList';
import { EmployeeManager } from './components/EmployeeManager';
import { ActivityManager } from './components/ActivityManager';
import { AnalyticsView } from './components/AnalyticsView';
import { DocumentGeneratorModal } from './components/DocumentGeneratorModal';
import { initialEmployees, initialActivities, initialTrips } from './mockData';
import { Trip, Employee, Activity } from './types';
import { Printer, FileSpreadsheet, Eye } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('excel_form');

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('simpd_nagekeo_employees');
    return saved ? JSON.parse(saved) : initialEmployees;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('simpd_nagekeo_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('simpd_nagekeo_trips');
    return saved ? JSON.parse(saved) : initialTrips;
  });

  const [selectedTripForDoc, setSelectedTripForDoc] = useState<Trip | null>(null);

  useEffect(() => {
    localStorage.setItem('simpd_nagekeo_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('simpd_nagekeo_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('simpd_nagekeo_trips', JSON.stringify(trips));
  }, [trips]);

  // Trip handlers
  const handleSaveTrip = (newOrUpdatedTrip: Trip) => {
    const exists = trips.some(t => t.id === newOrUpdatedTrip.id);
    if (exists) {
      setTrips(trips.map(t => t.id === newOrUpdatedTrip.id ? newOrUpdatedTrip : t));
    } else {
      setTrips([newOrUpdatedTrip, ...trips]);
    }
  };

  const handleDeleteTrip = (id: string) => {
    if (window.confirm('Hapus berkas perjalanan dinas ini?')) {
      setTrips(trips.filter(t => t.id !== id));
    }
  };

  // Employee handlers
  const handleAddEmployee = (emp: Employee) => {
    setEmployees([...employees, emp]);
  };

  const handleUpdateEmployee = (updatedEmp: Employee) => {
    setEmployees(employees.map(e => e.id === updatedEmp.id ? updatedEmp : e));
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Hapus data ASN ini?')) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  };

  // Activity handlers
  const handleAddActivity = (act: Activity) => {
    setActivities([...activities, act]);
  };

  const handleUpdateActivity = (updatedAct: Activity) => {
    setActivities(activities.map(a => a.id === updatedAct.id ? updatedAct : a));
  };

  const handleDeleteActivity = (id: string) => {
    if (window.confirm('Hapus kegiatan DPA ini?')) {
      setActivities(activities.filter(a => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewTrip={() => setActiveTab('excel_form')}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            trips={trips}
            employees={employees}
            activities={activities}
            setActiveTab={setActiveTab}
            onOpenExcelForm={() => setActiveTab('excel_form')}
            onSelectTripForDoc={(trip) => setSelectedTripForDoc(trip)}
          />
        )}

        {activeTab === 'excel_form' && (
          <ExcelFormatForm
            employees={employees}
            activities={activities}
            initialTrip={trips[0]}
            onSaveTrip={(trip) => {
              handleSaveTrip(trip);
            }}
            onPreviewDocs={(trip) => {
              handleSaveTrip(trip);
              setSelectedTripForDoc(trip);
            }}
          />
        )}

        {activeTab === 'trips' && (
          <TripList
            trips={trips}
            employees={employees}
            activities={activities}
            onOpenExcelForm={() => setActiveTab('excel_form')}
            onSelectTripForDoc={(trip) => setSelectedTripForDoc(trip)}
            onDeleteTrip={handleDeleteTrip}
          />
        )}

        {activeTab === 'employees' && (
          <EmployeeManager
            employees={employees}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
          />
        )}

        {activeTab === 'activities' && (
          <ActivityManager
            activities={activities}
            onAddActivity={handleAddActivity}
            onUpdateActivity={handleUpdateActivity}
            onDeleteActivity={handleDeleteActivity}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            trips={trips}
            employees={employees}
            activities={activities}
          />
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Pusat Cetak Dokumen Resmi Perjalanan Dinas</h2>
                <p className="text-xs text-slate-500">
                  Cetak SPT, Seluruh Lembar SPD Petugas, Visum/Lembar Belakang, Kwitansi Tanda Bukti Bayar, Pembayaran Kolektif Bank NTT, dan Laporan.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('excel_form')}
                className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Buka Format Isian Excel</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Nomor SPT & Tanggal</th>
                    <th className="py-3.5 px-4">Daftar Petugas Lapangan</th>
                    <th className="py-3.5 px-4">Maksud Perjalanan & Tempat Tugas</th>
                    <th className="py-3.5 px-4 text-right">Aksi Dokumen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trips.map((trip) => {
                    const firstEmp = employees.find(e => e.id === trip.personnel[0]?.employeeId);
                    return (
                      <tr key={trip.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-mono font-bold text-slate-900">{trip.sptNumber}</div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">Tanggal: {trip.tanggalBerangkat}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-800">{firstEmp?.name || 'Petugas 1'} dkk</div>
                          <div className="text-[10px] text-blue-700 font-semibold mt-0.5">
                            {trip.personnel.length} Orang Penerima Tugas
                          </div>
                        </td>
                        <td className="py-4 px-4 max-w-sm">
                          <div className="font-semibold text-slate-900">{trip.tempatTugas}</div>
                          <div className="text-[11px] text-slate-500 truncate">{trip.maksudPerjalanan}</div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setSelectedTripForDoc(trip)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Buka Preview & Cetak Semua Lembar</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Document Generator Modal */}
      {selectedTripForDoc && (
        <DocumentGeneratorModal
          trip={selectedTripForDoc}
          employees={employees}
          activities={activities}
          onClose={() => setSelectedTripForDoc(null)}
        />
      )}

      <footer className="bg-slate-900 text-slate-400 py-6 px-4 text-center text-xs border-t border-slate-800 print:hidden mt-auto">
        <p>Sistem Informasi Perjalanan Dinas (SIMPD) • Bidang Sumber Daya Air Dinas PUPR Kabupaten Nagekeo</p>
      </footer>
    </div>
  );
}
