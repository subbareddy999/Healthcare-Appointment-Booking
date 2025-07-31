import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());
// --- Mock Data ---
const doctors = [
    {
        id: 1,
        name: 'Dr. Evelyn Reed',
        specialization: 'Cardiologist',
        profileImage: 'https://i.pravatar.cc/150?img=1',
        availabilityStatus: 'Available Today',
        availabilitySlots: [
            { date: '2025-08-01', times: ['09:00 AM', '11:00 AM', '02:00 PM'] },
            { date: '2025-08-02', times: ['10:00 AM', '03:00 PM'] }
        ],
        about: 'Dr. Evelyn Reed is a board-certified cardiologist with over 15 years of experience in diagnosing and treating heart conditions. She is dedicated to providing compassionate and comprehensive care.'
    },
    {
        id: 2,
        name: 'Dr. Marcus Chen',
        specialization: 'Dermatologist',
        profileImage: 'https://i.pravatar.cc/150?img=2',
        availabilityStatus: 'Available Tomorrow',
        availabilitySlots: [
            { date: '2025-08-02', times: ['08:30 AM', '11:30 AM'] },
            { date: '2025-08-03', times: ['01:00 PM', '04:00 PM'] }
        ],
        about: 'Dr. Marcus Chen specializes in medical and cosmetic dermatology. He is known for his patient-focused approach and expertise in treating a wide range of skin conditions.'
    },
    {
        id: 3,
        name: 'Dr. Olivia Bennett',
        specialization: 'Pediatrician',
        profileImage: 'https://i.pravatar.cc/150?img=3',
        availabilityStatus: 'Available Today',
        availabilitySlots: [
            { date: '2025-08-01', times: ['10:00 AM', '12:00 PM', '03:30 PM'] },
            { date: '2025-08-04', times: ['09:30 AM'] }
        ],
        about: 'Dr. Olivia Bennett is a caring pediatrician committed to the health and well-being of children. She has a gentle approach that makes kids and parents feel at ease.'
    },
    {
        id: 4,
        name: 'Dr. Samuel Jones',
        specialization: 'Orthopedic Surgeon',
        profileImage: 'https://i.pravatar.cc/150?img=4',
        availabilityStatus: 'Available Next Week',
        availabilitySlots: [
            { date: '2025-08-05', times: ['11:00 AM', '01:00 PM'] },
            { date: '2025-08-07', times: ['09:00 AM', '11:30 AM'] }
        ],
        about: 'Dr. Samuel Jones is a leading orthopedic surgeon specializing in sports injuries and joint replacement. He uses the latest techniques to ensure rapid recovery.'
    },
    {
        id: 5,
        name: 'Dr. Aisha Khan',
        specialization: 'Neurologist',
        profileImage: 'https://i.pravatar.cc/150?img=5',
        availabilityStatus: 'Available Today',
        availabilitySlots: [
            { date: '2025-08-01', times: ['02:30 PM', '04:30 PM'] },
            { date: '2025-08-04', times: ['10:00 AM'] }
        ],
        about: 'Dr. Aisha Khan has extensive experience in treating neurological disorders, including epilepsy and multiple sclerosis. She is a compassionate and dedicated specialist.'
    },
    {
        id: 6,
        name: 'Dr. Benjamin Carter',
        specialization: 'Gastroenterologist',
        profileImage: 'https://i.pravatar.cc/150?img=6',
        availabilityStatus: 'Available Tomorrow',
        availabilitySlots: [
            { date: '2025-08-02', times: ['09:00 AM', '11:00 AM'] },
            { date: '2025-08-05', times: ['02:00 PM'] }
        ],
        about: 'Dr. Benjamin Carter focuses on the diagnosis and treatment of digestive system disorders. He is committed to helping patients achieve better digestive health.'
    },
    {
        id: 7,
        name: 'Dr. Chloe Garcia',
        specialization: 'Oncologist',
        profileImage: 'https://i.pravatar.cc/150?img=7',
        availabilityStatus: 'Consultation Only',
        availabilitySlots: [
            { date: '2025-08-06', times: ['10:30 AM', '12:30 PM'] }
        ],
        about: 'Dr. Chloe Garcia is a respected oncologist known for her empathetic approach to cancer care and her dedication to innovative treatment methods.'
    },
    {
        id: 8,
        name: 'Dr. David Lee',
        specialization: 'Psychiatrist',
        profileImage: 'https://i.pravatar.cc/150?img=8',
        availabilityStatus: 'Available Today',
        availabilitySlots: [
            { date: '2025-08-01', times: ['01:00 PM', '03:00 PM', '05:00 PM'] }
        ],
        about: 'Dr. David Lee provides expert care for a wide range of mental health issues. He creates a supportive environment for his patients to thrive.'
    },
    {
        id: 9,
        name: 'Dr. Sophia Martinez',
        specialization: 'Ophthalmologist',
        profileImage: 'https://i.pravatar.cc/150?img=9',
        availabilityStatus: 'Available Next Week',
        availabilitySlots: [
            { date: '2025-08-07', times: ['09:30 AM', '11:30 AM'] },
            { date: '2025-08-08', times: ['02:30 PM'] }
        ],
        about: 'Dr. Sophia Martinez specializes in comprehensive eye care, from routine exams to complex surgical procedures. Your vision is her top priority.'
    },
    {
        id: 10,
        name: 'Dr. Liam Wilson',
        specialization: 'Endocrinologist',
        profileImage: 'https://i.pravatar.cc/150?img=10',
        availabilityStatus: 'Available Today',
        availabilitySlots: [
            { date: '2025-08-01', times: ['10:00 AM'] },
            { date: '2025-08-04', times: ['02:00 PM', '04:00 PM'] }
        ],
        about: 'Dr. Liam Wilson is an expert in hormonal disorders, including diabetes and thyroid conditions. He offers personalized treatment plans for his patients.'
    },
    {
        id: 11,
        name: 'Dr. Isabella Brown',
        specialization: 'Pulmonologist',
        profileImage: 'https://i.pravatar.cc/150?img=11',
        availabilityStatus: 'Available Tomorrow',
        availabilitySlots: [
            { date: '2025-08-02', times: ['01:30 PM', '03:30 PM'] }
        ],
        about: 'Dr. Isabella Brown specializes in respiratory diseases like asthma and COPD. She is committed to helping her patients breathe easier.'
    },
    {
        id: 12,
        name: 'Dr. Mason Rodriguez',
        specialization: 'Rheumatologist',
        profileImage: 'https://i.pravatar.cc/150?img=12',
        availabilityStatus: 'Available Today',
        availabilitySlots: [
            { date: '2025-08-01', times: ['09:00 AM', '11:00 AM'] }
        ],
        about: 'Dr. Mason Rodriguez treats autoimmune and inflammatory conditions that affect the joints, muscles, and bones, such as arthritis.'
    },
    {
        id: 13,
        name: 'Dr. Harper Garcia',
        specialization: 'Allergist',
        profileImage: 'https://i.pravatar.cc/150?img=13',
        availabilityStatus: 'Available Next Week',
        availabilitySlots: [
            { date: '2025-08-05', times: ['10:00 AM', '12:00 PM', '02:00 PM'] }
        ],
        about: 'Dr. Harper Garcia helps patients manage allergies and asthma, providing relief and improving quality of life through effective treatments.'
    },
    {
        id: 14,
        name: 'Dr. Ethan Taylor',
        specialization: 'Urologist',
        profileImage: 'https://i.pravatar.cc/150?img=14',
        availabilityStatus: 'Available Today',
        availabilitySlots: [
            { date: '2025-08-01', times: ['03:00 PM', '04:00 PM'] },
            { date: '2025-08-03', times: ['10:00 AM'] }
        ],
        about: 'Dr. Ethan Taylor provides comprehensive care for urinary tract issues and the male reproductive system with utmost professionalism.'
    },
    {
        id: 15,
        name: 'Dr. Ava Moore',
        specialization: 'Gynecologist',
        profileImage: 'https://i.pravatar.cc/150?img=15',
        availabilityStatus: 'Available Tomorrow',
        availabilitySlots: [
            { date: '2025-08-02', times: ['10:00 AM', '01:00 PM', '03:00 PM'] }
        ],
        about: 'Dr. Ava Moore offers a full range of gynecological services, focusing on women\'s health with a compassionate and understanding approach.'
    },
    {
        id: 16,
        name: 'Dr. Noah Walker',
        specialization: 'Nephrologist',
        profileImage: 'https://i.pravatar.cc/150?img=16',
        availabilityStatus: 'Available Today',
        availabilitySlots: [
            { date: '2025-08-01', times: ['11:00 AM', '01:00 PM'] }
        ],
        about: 'Dr. Noah Walker specializes in kidney care and the treatment of kidney diseases, helping patients manage their condition effectively.'
    },
    {
        id: 17,
        name: 'Dr. Mia Hall',
        specialization: 'Podiatrist',
        profileImage: 'https://i.pravatar.cc/150?img=17',
        availabilityStatus: 'Available Next Week',
        availabilitySlots: [
            { date: '2025-08-06', times: ['09:00 AM', '11:00 AM', '02:00 PM'] }
        ],
        about: 'Dr. Mia Hall provides expert care for foot and ankle problems, ensuring patients can stay active and pain-free.'
    },
    {
        id: 18,
        name: 'Dr. Lucas Allen',
        specialization: 'General Practitioner',
        profileImage: 'https://i.pravatar.cc/150?img=18',
        availabilityStatus: 'Available Today',
        availabilitySlots: [
            { date: '2025-08-01', times: ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM'] }
        ],
        about: 'Dr. Lucas Allen is a trusted General Practitioner providing primary care for the entire family with a focus on preventative health.'
    },
    {
        id: 19,
        name: 'Dr. Amelia King',
        specialization: 'ENT Specialist',
        profileImage: 'https://i.pravatar.cc/150?img=19',
        availabilityStatus: 'Available Tomorrow',
        availabilitySlots: [
            { date: '2025-08-02', times: ['02:00 PM', '04:00 PM'] }
        ],
        about: 'Dr. Amelia King treats conditions of the ear, nose, and throat. She is dedicated to finding solutions for sinus, allergy, and hearing issues.'
    },
    {
        id: 20,
        name: 'Dr. James Wright',
        specialization: 'Cardiologist',
        profileImage: 'https://i.pravatar.cc/150?img=20',
        availabilityStatus: 'Available Today',
        availabilitySlots: [
            { date: '2025-08-01', times: ['10:30 AM', '12:30 PM'] },
            { date: '2025-08-04', times: ['09:00 AM', '11:30 AM'] }
        ],
        about: 'Dr. James Wright is a renowned cardiologist specializing in interventional procedures to treat heart disease and improve patient outcomes.'
    }
];

// --- API Endpoints ---
app.get('/api/doctors', (req, res) => {
    res.json(doctors);
});

app.get('/api/doctors/:id', (req, res) => {
    const doctorId = parseInt(req.params.id, 10);
    const doctor = doctors.find(d => d.id === doctorId);

    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
});

app.post('/api/bookings', (req, res) => {
    const { doctorId, patientName, email, date, time } = req.body;

    if (!doctorId || !patientName || !email || !date || !time) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('--- New Appointment Booked ---');
    console.log('Doctor ID:', doctorId);
    console.log('Patient Name:', patientName);
    console.log('Email:', email);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('------------------------------');

    res.status(201).json({ message: 'Appointment booked successfully!' });
});


app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
