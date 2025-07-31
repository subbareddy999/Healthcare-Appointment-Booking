import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DoctorProfilePage from './components/DoctorProfilePage';
import Header from './components/Header';
import HomePage from './components/HomePage';
import MyAppointmentsPage from './components/MyAppointmentsPage';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctor/:id" element={<DoctorProfilePage />} />
            <Route path="/my-appointments" element={<MyAppointmentsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
