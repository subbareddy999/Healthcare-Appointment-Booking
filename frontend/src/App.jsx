import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DoctorProfilePage from './components/DoctorProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './components/HomePage';
import MyAppointmentsPage from './components/MyAppointmentsPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Router>
        <ScrollToTop/>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctor/:id" element={<DoctorProfilePage />} />
            <Route path="/my-appointments" element={<MyAppointmentsPage />} />
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
