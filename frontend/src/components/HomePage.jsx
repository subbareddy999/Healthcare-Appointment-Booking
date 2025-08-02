import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import DoctorCard from '../components/DoctorCard';
import SkeletonCard from '../components/SkeletonCard';

const NoResults = () => (
  <div className="text-center col-span-full py-16">
    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    </svg>
    <h3 className="mt-2 text-lg font-medium text-black">No Doctors Found</h3>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
  </div>
);

function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');

  useEffect(() => {
    document.title = 'HealthBooker | Book Your Appointment';
    setLoading(true);
    axios.get('http://localhost:5000/api/doctors')
      .then(response => { setDoctors(response.data); })
      .catch(error => { console.error("Error fetching doctors!", error); })
      .finally(() => { setLoading(false); });
  }, []);

  const specializations = ['All', ...new Set(doctors.map(d => d.specialization))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialization = selectedSpecialization === 'All' || doctor.specialization === selectedSpecialization;
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialization && matchesSearch;
  });

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Effortless Appointment Booking</h1>
          <p className="text-lg md:text-xl mt-4 font-light">Find top-rated doctors and book your next appointment in seconds.</p>
        </div>
      </div>

      <div className="container mx-auto px-6">

        <div className="relative -mt-12 bg-gray-100  rounded-xl shadow-lg p-6 md:p-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name or specialization..."
              className="w-full p-4 pl-10 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm font-semibold text-gray-600 dark:text-black">Filter by:</span>
            {specializations.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialization(spec)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  selectedSpecialization === spec
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-900'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            ) : filteredDoctors.length > 0 ? (
              filteredDoctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <NoResults />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default HomePage;
