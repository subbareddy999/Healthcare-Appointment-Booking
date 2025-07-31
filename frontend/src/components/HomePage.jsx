import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import SkeletonCard from '../components/SkeletonCard';
function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/doctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the doctors!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Your Doctor</h1>

      <input
        type="text"
        placeholder="Search by name or specialization..."
        className="w-full p-3 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
