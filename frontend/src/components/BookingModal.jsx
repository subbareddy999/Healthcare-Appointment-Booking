import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

function BookingModal({ doctor, availability, onClose }) {
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientName || !email || !selectedDate || !selectedTime) {
      toast.error('All fields are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const bookingDetails = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      patientName,
      email,
      date: selectedDate,
      time: selectedTime,
    };

    toast.promise(
      axios.post('http://localhost:5000/api/bookings', bookingDetails),
      {
        loading: 'Booking appointment...',
        success: () => {
          const existingBookings = JSON.parse(localStorage.getItem('myAppointments')) || [];
          localStorage.setItem('myAppointments', JSON.stringify([...existingBookings, bookingDetails]));

          setTimeout(() => {
            onClose();
          }, 1500);

          return `Appointment with ${doctor.name} confirmed!`;
        },
        error: (err) => err.response?.data?.message || 'Booking failed. Please try again.',
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
        <h3 className="text-lg text-gray-700 mb-6">with {doctor.name}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Patient Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Appointment Date</label>
            <select
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime('');
              }}
            >
              <option value="">Select a date</option>
              {availability.map(slot => (
                <option key={slot.date} value={slot.date}>
                  {new Date(slot.date).toDateString()}
                </option>
              ))}
            </select>
          </div>
          {selectedDate && (
            <div className="mb-6">
              <label className="block text-gray-700">Available Time</label>
              <select
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select a time</option>
                {availability
                  .find(slot => slot.date === selectedDate)?.times
                  .map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
              </select>
            </div>
          )}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
