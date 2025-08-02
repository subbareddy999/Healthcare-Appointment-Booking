import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import { AnimatePresence, motion } from 'framer-motion';

const ProfileSkeleton = () => (
    <div className="container mx-auto px-6 py-8 animate-pulse">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-48 h-48 rounded-full bg-gray-300"></div>
          <div className="md:ml-8 mt-6 md:mt-0 w-full">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mt-4"></div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
        <div className="flex gap-4">
          <div className="h-20 w-24 bg-gray-300 rounded-lg"></div>
          <div className="h-20 w-24 bg-gray-300 rounded-lg"></div>
          <div className="h-20 w-24 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

function DoctorProfilePage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    if (!id) return;
    if (!isModalOpen) {
    const fetchDoctorDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/doctors/${id}`);
          const doctorData = response.data;
          setDoctor(doctorData);
          document.title = `${doctorData.name} | HealthBooker`;

          const bookedAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];
          const now = new Date();

          const filteredSlots = doctorData.availabilitySlots.map(daySlot => {
            const slotDate = new Date(daySlot.date);
            slotDate.setHours(23, 59, 59, 999);
            if (slotDate < now) {
              return { ...daySlot, times: [] };
            }

            const bookedTimesForDate = bookedAppointments
              .filter(booking => booking.doctorId === doctorData.id && booking.date === daySlot.date)
              .map(booking => booking.time);

            let availableTimes = daySlot.times.filter(time => !bookedTimesForDate.includes(time));

            const isToday = now.toDateString() === new Date(daySlot.date).toDateString();
            if (isToday) {
              availableTimes = availableTimes.filter(time => {
                const [hourMinute, period] = time.split(' ');
                let [hour, minute] = hourMinute.split(':').map(Number);
                if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
                if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
                const timeDate = new Date();
                timeDate.setHours(hour, minute, 0, 0);
                return timeDate > now;
              });
            }

            return { ...daySlot, times: availableTimes };
          }).filter(daySlot => daySlot.times.length > 0);

          setAvailableSlots(filteredSlots);


      } catch (error) {
        console.error("Error fetching doctor details!", error);
      }
    };

    fetchDoctorDetails();
    setSelectedDate(null);
    setSelectedTime(null);
    }
}, [id, isModalOpen]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  if (!doctor) {
    return <ProfileSkeleton />;
  }

  const hasAvailability = availableSlots.length > 0;
  const timesForSelectedDate = availableSlots.find(slot => slot.date === selectedDate)?.times || [];


  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* New Doctor Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <motion.img
            layoutId={`doctor-image-${id}`} // For potential shared layout animation
            className="w-48 h-48 rounded-full object-cover ring-4 ring-blue-100"
            src={doctor.profileImage}
            alt={`Dr. ${doctor.name}`}
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900">{doctor.name}</h1>
            <p className="text-xl text-blue-600 font-semibold mt-1">{doctor.specialization}</p>
            <div className="flex justify-center md:justify-start items-center gap-4 mt-4 text-gray-600">
              <span className="flex items-center gap-1">★ {doctor.rating} ({doctor.reviews} reviews)</span>
            </div>
            <p className="mt-4 text-gray-700 max-w-2xl">{doctor.about}</p>
          </div>
        </div>

        {/* New Booking & Availability Section */}
        {hasAvailability ? (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select a Date & Time</h2>

            {/* Date Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">1. Choose a Date</h3>
              <div className="flex gap-3 pb-2 -mx-1 px-1 overflow-x-auto">
                {availableSlots.map(slot => (
                  <button key={slot.date} onClick={() => handleDateSelect(slot.date)} className={`flex-shrink-0 text-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${selectedDate === slot.date ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-500'}`}>
                    <p className="font-bold">{new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className="text-2xl font-extrabold">{new Date(slot.date).getDate()}</p>
                    <p className="text-sm">{new Date(slot.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selector - appears after a date is selected */}
            <AnimatePresence>
            {selectedDate && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">2. Choose a Time</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {timesForSelectedDate.map(time => (
                    <button key={time} onClick={() => setSelectedTime(time)} className={`px-4 py-2 rounded-lg border-2 text-center font-semibold transition-all duration-200 ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-500'}`}>
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            </AnimatePresence>

            {/* Booking Button - appears after a time is selected */}
            <AnimatePresence>
            {selectedTime && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
                <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-lg">
                  Book Appointment for {selectedTime}
                </button>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="mt-8 text-center bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-500">No Appointments Available</h2>
            <p className="text-gray-400 mt-2">Please check back later for new openings.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
      {isModalOpen && selectedDate && selectedTime && (
        <BookingModal
          doctor={doctor}
          availability={availableSlots}
          onClose={() => setIsModalOpen(false)}
          date={selectedDate}
          time={selectedTime}
        />
      )}
      </AnimatePresence>
    </div>
  );
}

export default DoctorProfilePage;
