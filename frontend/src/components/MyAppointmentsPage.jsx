import React, { useEffect, useState } from 'react';

function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Appointments</h1>

      {appointments.length > 0 ? (
        <div className="space-y-6">
          {appointments.map((appt, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-700">{appt.doctorName}</h2>
              <p className="text-md text-gray-600">{appt.specialization}</p>
              <hr className="my-3" />
              <p className="text-gray-800">
                <strong>Date:</strong> {new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-gray-800">
                <strong>Time:</strong> {appt.time}
              </p>
              <p className="text-gray-800 mt-2">
                <strong>Booked for:</strong> {appt.patientName} ({appt.email})
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700">No appointments found.</h2>
            <p className="text-gray-500 mt-2">Book an appointment with a doctor to see it here.</p>
        </div>
      )}
    </div>
  );
}

export default MyAppointmentsPage;
