import React from 'react';
import { Link } from 'react-router-dom';

function DoctorCard({ doctor }) {
  const statusColor = doctor.availabilityStatus === 'Available Today'
    ? 'text-green-600'
    : 'text-yellow-600';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <div className="p-6">
        <img
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200"
          src={doctor.profileImage}
          alt={`Dr. ${doctor.name}`}
        />
        <h3 className="text-xl font-bold text-center text-gray-800">{doctor.name}</h3>
        <p className="text-md text-gray-600 text-center">{doctor.specialization}</p>
        <p className={`text-sm font-semibold text-center mt-2 ${statusColor}`}>
          {doctor.availabilityStatus}
        </p>
        <div className="text-center mt-6">
          <Link
            to={`/doctor/${doctor.id}`}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
