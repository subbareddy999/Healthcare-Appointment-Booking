# 🏥 Healthcare Appointment Booking

A full-stack web application built using the **MERN** stack that simplifies the process of booking healthcare appointments. Users can search doctors, check real-time availability, and manage their bookings seamlessly through a clean and responsive interface.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Framer Motion](https://img.shields.io/badge/FramerMotion-0055FF?style=for-the-badge&logo=framer&logoColor=white)


---

## ✨ Features

* 🔍 **Doctor Search**: Quickly find doctors by name or specialization.
* 🗓 **Live Availability**: Automatically filters out booked time slots.
* 📝 **Appointment Booking**: Clean, validated form to book new appointments.
* 📋 **My Appointments**: View your saved appointments (stored via `localStorage`).
* 🔔 **Toast Notifications**: Feedback using `react-hot-toast` for smooth interaction.
* 🧱 **Skeleton Loaders**: Enhances user experience during data fetching.
* 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop screens.

---

## ✨ Key Features & Improvements Added

I focused on enhancing the user experience, modernizing the UI, and adding valuable new features.

### 🎨 UI/UX Overhaul

- **Global Font Update**: Replaced all fonts with **Poppins** for a modern look.
- **Glassmorphism Header**: Sticky, semi-transparent floating header.

#### Homepage Improvements:
- Added a bold **hero section**.
- Combined search + filters into a floating control panel.
- Redesigned **Doctor Cards** with star ratings and animations via **Framer Motion**.

#### Doctor Profile Page:
- Split layout: **Doctor Info** & **Booking** sections.
- Replaced dropdowns with clickable **date-first, then time** UI.

#### Booking Modal:
- Redesigned modal with icon, smooth entrance/exit animations.
- Added **inline validation feedback**.

#### Footer:
- Added a comprehensive, professional footer with navigation links and disclaimers.

#### New Components:
- Custom **404 page**.
- **Scroll-to-Top** button for smoother navigation.

---

## ⚙️ Core Functional Enhancements
- **Smart Availability Logic**: Past time slots are automatically disabled.

### My Appointments Section:
- Appointments categorized into **Upcoming** and **Past**.
- Users can now **cancel** upcoming appointments.
- Added **Add to Calendar** with Google Calendar link generator.

---


## 🛠️ Tech Stack

| Category       | Technology                                       |
| -------------- | ----------------------------------------------------------------------- |
| **Frontend**   | React.js (Vite), Tailwind CSS, Axios, React Router DOM, React Hot Toast |
| **Backend**    | Node.js, Express.js, CORS, Nodemon                                      |

---

## 📂 Project Structure

```
Healthcare-Appointment-Booking/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   └── ...
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── BookingModal.jsx
    │   │   ├── DoctorCard.jsx
    │   │   ├── Header.jsx
    │   │   ├── SkeletonCard.jsx
    │   │   ├── DoctorProfilePage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── Footer.jsx
    │   │   ├── NotFoundPage.jsx
    │   │   ├── ScrollToTop.jsx
    │   │   └── MyAppointmentsPage.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── tailwind.config.js
    └── vite.config.js
```

---

## ⚙️ Local Development Setup

### 🧰 Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* [Vite](https://vitejs.dev/)

---

### 🔧 Installation Guide

#### 1. Clone the Repository

```bash
git clone https://github.com/subbareddy999/Healthcare-Appointment-Booking.git
cd Healthcare-Appointment-Booking
```

#### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

* Backend runs on: `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

* Frontend runs on: `http://localhost:5173`

---

## 🔍 Live Preview

Once both frontend and backend are running, open your browser and navigate to:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint        | Description                        |
| ------ | --------------- | ---------------------------------- |
| `GET`  | `/api/doctors`  | Get list of all available doctors. |
| `POST` | `/api/bookings` | Book a new appointment.            |
| `GET`  | `/api/bookings` | Retrieve all bookings by user.     |

---

## 🧠 Challenges & Solutions

### 🐛 Challenges Faced & Solutions

### 1. Preventing Double Booking
- **Issue**: Static time slots could be booked multiple times.
- **Solution**: Booked slots are stored in `localStorage` and dynamically excluded during selection.

### 2. Backend Validation Issues
- **Issue**: API calls were missing required fields like `doctorId`.
- **Solution**: Updated booking logic to ensure all necessary data is passed and validated.

### 3. Lack of User Feedback
- **Issue**: Users didn’t receive feedback after actions like booking success or failure.
- **Solution**: Integrated `react-hot-toast` with `promise`-based notifications to provide clear and timely feedback.

### 4. Double-Booking Due to Stale State
- **Issue**: After booking, the same slot could still be selected because the UI didn’t refresh properly.
- **Solution**: Added `isModalOpen` to the `useEffect` dependency array and refreshed booking data once the modal closes.

### 5. Incorrect Scroll Position on Navigation
- **Issue**: Navigating from long pages caused the next page to load with the scroll already at the bottom.
- **Solution**: Created a `ScrollToTop` component using `useLocation` from `react-router-dom` to auto-scroll to top on route changes.

### 6. Custom Font Not Applying
- **Issue**: The "Poppins" font wasn’t rendering in the application.
- **Solution**: Removed the `<link>` tag from `index.html` and properly imported the font in `index.css`, which is then loaded through `main.jsx`—a more reliable method in Vite.


---

## 🔮 Future Improvements

* **MongoDB Integration**: Persist user and appointment data.
* **Authentication**: Add secure login/registration using JWT.
* **Notifications**: Email/SMS confirmations using Nodemailer or Twilio.
* **Testing Suite**: Add tests with Jest and React Testing Library.
* **Deployment**: CI/CD with GitHub Actions, Vercel (frontend), Render/Heroku (backend).

---

## 👤 Author

**Subbareddy Karri**

* 🔗 [GitHub](https://github.com/subbareddy999)
* 💼 [LinkedIn](https://www.linkedin.com/in/subbareddykarri/)

---

> *"Built with a focus on simplicity, clarity, and improving access to healthcare through technology."*
