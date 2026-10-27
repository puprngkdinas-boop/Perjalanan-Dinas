import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { TripList } from './components/TripList';
import { EmployeeManager } from './components/EmployeeManager';
import { ActivityManager } from './components/ActivityManager';
import { AnalyticsView } from './components/AnalyticsView';
import { DocumentGeneratorModal } from './components/DocumentGeneratorModal';
import { TripReportModal } from './components/TripReportModal';
import { initialEmployees, initialActivities, initialTrips, initialReports } from './mockData';
import { Trip, Employee, Activity, TripReport } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('simpd_employees');
    return saved ? JSON.parse(saved) : initialEmployees;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('simpd_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('simpd_trips');
    return saved ? JSON.parse(saved) : initialTrips;
  });

  const [reports, setReports] = useState<TripReport[]>(() => {
    const saved = localStorage.getItem('simpd_reports');
    return saved ? JSON.parse(saved) : initialReports;
  });

  const [selectedTripForDoc, setSelectedTripForDoc] = useState<Trip | null>(null);
  const [selectedTripForReport, setSelectedTripForReport] = useState<Trip | null>(null);

  useEffect(() => {
    localStorage.setItem('simpd_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('simpd_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('simpd_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('simpd_reports', JSON.stringify(reports));
  }, [reports]);

  // Trip handlers
  const handleAddTrip = (newTrip: Trip) => {
    setTrips([newTrip, ...trips]);
  };

  const handleUpdateTrip = (updatedTrip: Trip) => {
    setTrips(trips.map(t => t.id === updatedTrip.id ? updatedTrip : t));
  };

  const handleDeleteTrip = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data perjalanan dinas ini?')) {
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
    if (window.confirm('Hapus data pegawai ini?')) {
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

  // Report handlers
  const handleSaveReport = (report: TripReport) => {
    const existing = reports.find(r => r.tripId === report.tripId);
    if (existing) {
      setReports(reports.map(r => r.id === existing.id ? report : r));
    } else {
      setReports([...reports, report]);
    }
    // Also update trip status to 'Laporan Masuk'
    setTrips(trips.map(t => t.id === report.tripId ? { ...t, status: 'Laporan Masuk' } : t));
  };

  const handleQuickNewTrip = () => {
    setActiveTab('trips');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewTrip={handleQuickNewTrip}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            trips={trips}
            employees={employees}
            activities={activities}
            reports={reports}
            setActiveTab={setActiveTab}
            onNewTrip={handleQuickNewTrip}
            onSelectTripForDoc={(trip) => setSelectedTripForDoc(trip)}
          />
        )}

        {activeTab === 'trips' && (
          <TripList
            trips={trips}
            employees={employees}
            activities={activities}
            onAddTrip={handleAddTrip}
            onUpdateTrip={handleUpdateTrip}
            onDeleteTrip={handleDeleteTrip}
            onSelectTripForDoc={(trip) => setSelectedTripForDoc(trip)}
            onOpenReportModal={(trip) => setSelectedTripForReport(trip)}
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
            reports={reports}
          />
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900">Pusat Cetak Dokumen & Rekapitulasi</h2>
              <p className="text-xs text-slate-500">Pilih salah satu perjalanan dinas di bawah ini untuk mencetak SPT, SPD, Kwitansi, Daftar Pengeluaran Riil, atau Laporan.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4">No. SPT / SPD</th>
                    <th className="py-3.5 px-4">Pelaksana</th>
                    <th className="py-3.5 px-4">Tujuan</th>
                    <th className="py-3.5 px-4 text-right">Aksi Cetak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {trips.map((trip) => {
                    const emp = employees.find(e => e.id === trip.employeeId);
                    return (
                      <tr key={trip.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-900">
                          <div>{trip.sptNumber}</div>
                          <div className="text-xs text-slate-500 font-mono">{trip.spdNumber}</div>
                        </td>
                        <td className="py-4 px-4 font-medium text-slate-800">
                          {emp ? emp.name : 'Pegawai'}
                        </td>
                        <td className="py-4 px-4 text-slate-600">
                          {trip.destination}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setSelectedTripForDoc(trip)}
                            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-xl text-xs font-bold shadow-sm inline-flex items-center gap-1.5"
                          >
                            <span>Buka Pusat Dokumen</span>
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

      {/* Modals */}
      {selectedTripForDoc && (
        <DocumentGeneratorModal
          trip={selectedTripForDoc}
          employees={employees}
          activities={activities}
          reports={reports}
          onClose={() => setSelectedTripForDoc(null)}
        />
      )}

      {selectedTripForReport && (
        <TripReportModal
          trip={selectedTripForReport}
          employees={employees}
          activities={activities}
          existingReport={reports.find(r => r.tripId === selectedTripForReport.id)}
          onSaveReport={handleSaveReport}
          onClose={() => setSelectedTripForReport(null)}
        />
      )}

      <footer className="bg-slate-900 text-slate-400 py-6 px-4 text-center text-xs border-t border-slate-800 print:hidden">
        <p>SIMPD Bidang Sumber Daya Air • Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Nagekeo T.A. 2026</p>
      </footer>
    </div>
  );
}
