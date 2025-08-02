import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    <span className="text-yellow-500">★</span>
    <span className="ml-1 text-gray-700 font-bold">{rating}</span>
  </div>
);

function DoctorCard({ doctor }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
    <Link to={`/doctor/${doctor.id}`} className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img
            className="w-20 h-20 rounded-full border-4 border-gray-100"
            src={doctor.profileImage}
            alt={`Dr. ${doctor.name}`}
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                <p className="text-md text-gray-600">{doctor.specialization}</p>
              </div>
              <StarRating rating={doctor.rating} />
            </div>
            <p className="text-sm text-gray-500 mt-2">{doctor.reviews} reviews</p>
          </div>
        </div>
        <div className="text-right mt-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            View Availability
          </span>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}

export default DoctorCard;
