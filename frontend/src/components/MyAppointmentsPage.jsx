import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const generateGoogleCalendarLink = (appointment) => {
  const { date, time, doctorName, specialization } = appointment;

  const getEventDateTime = (dateStr, timeStr) => {
    const [hourMinute, period] = timeStr.split(' ');
    let [hour, minute] = hourMinute.split(':').map(Number);
    if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
    if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;

    const eventDate = new Date(dateStr);
    eventDate.setHours(hour, minute);
    return eventDate;
  };

  const startTime = getEventDateTime(date, time);
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

  const toISOStringInUTC = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const eventDetails = {
    title: `Appointment with ${doctorName}`,
    dates: `${toISOStringInUTC(startTime)}/${toISOStringInUTC(endTime)}`,
    details: `Medical appointment with ${doctorName} (${specialization}).`,
    location: 'Telehealth',
  };

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.dates}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}`;
};

const AppointmentCard = ({ appointment, onCancel }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
    <div className="flex flex-col sm:flex-row justify-between sm:items-start">
      <div>
        <h2 className="text-xl font-bold text-blue-700 dark:text-indigo-400">{appointment.doctorName}</h2>
        <p className="text-md text-gray-600 dark:text-gray-400">{appointment.specialization}</p>
        <hr className="my-3 dark:border-gray-700" />
        <p className="text-gray-800 dark:text-gray-300">
          <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <p className="text-gray-800 dark:text-gray-300">
          <strong>Time:</strong> {appointment.time}
        </p>
      </div>
      {onCancel && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-4 sm:mt-0 flex-shrink-0">
          <a
            href={generateGoogleCalendarLink(appointment)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Add to Calendar
          </a>
          <button
            onClick={onCancel}
            className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  </div>
);

function MyAppointmentsPage() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    document.title = 'My Appointments | HealthBooker';
    const storedAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];

    const now = new Date();
    const upcomingAppointments = [];
    const pastAppointments = [];

    storedAppointments.forEach((appt, index) => {
      const [hourMinute, period] = appt.time.split(' ');
      let [hour, minute] = hourMinute.split(':').map(Number);
      if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
      if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;

      const apptDate = new Date(appt.date);
      apptDate.setHours(hour, minute);

      const appointmentWithIndex = { ...appt, originalIndex: index };

      if (apptDate > now) {
        upcomingAppointments.push(appointmentWithIndex);
      } else {
        pastAppointments.push(appointmentWithIndex);
      }
    });

    setUpcoming(upcomingAppointments.sort((a, b) => new Date(a.date) - new Date(b.date)));
    setPast(pastAppointments.sort((a, b) => new Date(b.date) - new Date(a.date)));

    return () => { document.title = 'HealthBooker | Book Your Appointment'; };
  }, []);

  const handleCancel = (originalIndex) => {
    const allAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];
    const updatedAppointments = allAppointments.filter((_, index) => index !== originalIndex);

    localStorage.setItem('myAppointments', JSON.stringify(updatedAppointments));

    setUpcoming(upcoming.filter(appt => appt.originalIndex !== originalIndex));
    toast.success('Appointment canceled successfully!');
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">My Appointments</h1>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4 border-b-2 dark:border-gray-700 pb-2">Upcoming</h2>
        {upcoming.length > 0 ? (
          <div className="space-y-6">
            {upcoming.map(appt => (
              <AppointmentCard key={appt.originalIndex} appointment={appt} onCancel={() => handleCancel(appt.originalIndex)} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">You have no upcoming appointments.</p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4 border-b-2 dark:border-gray-700 pb-2">Past</h2>
        {past.length > 0 ? (
          <div className="space-y-6 opacity-70">
            {past.map(appt => (
              <AppointmentCard key={appt.originalIndex} appointment={appt} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">You have no past appointments.</p>
        )}
      </section>
    </div>
  );
}

export default MyAppointmentsPage;
