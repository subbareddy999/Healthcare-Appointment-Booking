import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingModal from '../components/BookingModal';

function DoctorProfilePage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctors/${id}`);
        const doctorData = response.data;
        setDoctor(doctorData);

        const bookedAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];

        const filteredSlots = doctorData.availabilitySlots.map(daySlot => {
          const bookedTimesForDate = bookedAppointments
            .filter(booking => booking.doctorId === doctorData.id && booking.date === daySlot.date)
            .map(booking => booking.time);

          const trulyAvailableTimes = daySlot.times.filter(time => !bookedTimesForDate.includes(time));

          return { ...daySlot, times: trulyAvailableTimes };
        }).filter(daySlot => daySlot.times.length > 0);

        setAvailableSlots(filteredSlots);

      } catch (error) {
        console.error("Error fetching doctor details!", error);
      }
    };

    fetchDoctorDetails();
  }, [id, isModalOpen]);

  if (!doctor) {
    return <div className="text-center py-10">Loading doctor profile...</div>;
  }

  const hasAvailability = availableSlots.length > 0;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 md:flex">
        <div className="md:w-1/3 text-center md:text-left">
          <img
            className="w-48 h-48 rounded-full mx-auto md:mx-0 border-4 border-blue-200"
            src={doctor.profileImage}
            alt={`Dr. ${doctor.name}`}
          />
        </div>
        <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0">
          <h1 className="text-4xl font-bold text-gray-900">{doctor.name}</h1>
          <p className="text-xl text-gray-600 mt-1">{doctor.specialization}</p>
          <p className="mt-4 text-gray-700">{doctor.about}</p>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800">Availability</h3>
            {hasAvailability ? (
              availableSlots.map(slot => (
                <div key={slot.date} className="mt-2">
                  <p className="font-bold">{new Date(slot.date).toDateString()}:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {slot.times.map(time => (
                      <span key={time} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-2">No available appointments for this doctor.</p>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!hasAvailability}
              className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {hasAvailability ? 'Book Appointment' : 'No Slots Available'}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BookingModal
          doctor={doctor}
          availability={availableSlots}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default DoctorProfilePage;
