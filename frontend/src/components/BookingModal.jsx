import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// The modal now receives the selected date and time as props
function BookingModal({ doctor, availability, onClose, date, time }) {
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!patientName.trim()) newErrors.patientName = 'Patient name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }
    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validation
    if (!validateForm()) {
        toast.error("Please fix the errors before submitting.");
        return;
      }

    // 2. Construct the data payload
    const bookingDetails = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      patientName,
      email,
      date: date, // Use date from props
      time: time,   // Use time from props
    };

    // 3. The complete API call wrapped in a toast promise
    toast.promise(
      axios.post('http://localhost:5000/api/bookings', bookingDetails),
      {
        loading: 'Finalizing booking...',
        success: () => {
          // Save to localStorage on success
          const existingBookings = JSON.parse(localStorage.getItem('myAppointments')) || [];
          localStorage.setItem('myAppointments', JSON.stringify([...existingBookings, bookingDetails]));

          // Close the modal after a short delay
          setTimeout(() => {
            onClose();
          }, 500);

          return `Appointment with ${doctor.name} confirmed!`;
        },
        error: (err) => err.response?.data?.message || 'Booking failed. Please try again.',
      }
    );
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mb-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Confirm Your Appointment</h2>
          <p className="text-md text-gray-600 mt-1">with {doctor.name}</p>
          <div className="mt-4 bg-gray-100 rounded-lg px-4 py-2 text-lg font-semibold text-gray-800">
            {new Date(date).toDateString()} at {time}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)}
              onBlur={validateForm} // 3. Validate when user clicks away
              className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.patientName ? 'border-red-500' : 'border-gray-300'}`}  />
              {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)}
              onBlur={validateForm} // 3. Validate when user clicks away
              className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} // 4. Dynamic border
            />
            {/* 5. Show error message */}
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row-reverse gap-3">
            <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Finalize Booking
            </button>
            <button type="button" onClick={onClose} className="w-full sm:w-auto bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
              Back
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default BookingModal;
