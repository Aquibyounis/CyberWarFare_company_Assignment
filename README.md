# Mini Course Subscription Application (Black Friday Edition) 🎓🔥

A full-stack MERN application where users can browse, subscribe to free and paid courses with a special Black Friday promo code discount.

| 📖 Table of Contents | | | |
|---|---|---|---|
| [🚀 Live URLs](#-live-urls) | [🛠️ Tech Stack](#️-tech-stack) | [✨ Features](#-features) | [🔑 Credentials](#-demo-credentials) |
| [🎟️ Promo Code](#️-promo-code) | [📡 API Routes](#-api-routes) | [🏃 Setup](#-local-setup-instructions) | [📁 Project Structure](#-project-structure) |
| [🖼️ Screenshots](#️-screenshots) | [📝 Env Vars](#-environment-variables) | [🚢 Deployment](#-deployment) | [👨‍💻 Author](#-author) |

## 🚀 Live URLs

| Service | URL |
|---------|-----|
| Frontend | https://aquibminicourse.netlify.app |
| Backend | https://cyberwarfare-backend.onrender.com |


---

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **TailwindCSS** for styling
- **Axios** for API requests

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing

### Database
- **MongoDB Atlas** (Cloud)

---

## ✨ Features

- ✅ User authentication (Signup/Login)
- ✅ JWT-based protected routes
- ✅ Browse available courses (free & paid)
- ✅ Subscribe to free courses instantly
- ✅ Promo code validation for paid courses
- ✅ 50% discount with promo code
- ✅ View enrolled courses
- ✅ Responsive dark theme UI

---

## 🔑 Demo Credentials

| Email | Password |
|-------|----------|
| `user1@test.com` | `Test@123` |
| `user2@test.com` | `Test@123` |

---

## 🎟️ Promo Code

| Code | Discount | Applies To |
|------|----------|------------|
| `BFSALE25` | 50% OFF | All paid courses |

> **Note:** Promo code is **required** for subscribing to paid courses.

---

## 📡 API Routes

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/login` | Login user (returns JWT) |

### Courses
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/courses` | No | Get all courses |
| GET | `/courses/:id` | No | Get course by ID |

### Subscriptions
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/subscribe` | Yes | Subscribe to a course |
| POST | `/validate-promo` | Yes | Validate promo code |
| GET | `/my-courses` | Yes | Get user's subscriptions |

---

## 🏃 Local Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone Repository
```bash
git clone <repository-url>
cd CyberWarFare_company_Assignment
```

### 2. Setup Backend
```bash
cd serverside
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed database with dummy data
npm run seed

# Start server
npm start
```

### 3. Setup Frontend
```bash
cd clientside
npm install

# Create .env file
cp .env.example .env
# Edit .env if backend URL is different

# Start development server
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 📁 Project Structure

```
CyberWarFare_company_Assignment/
├── clientside/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   └── MyCourses.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   └── Loading.jsx
│   │   ├── services/api.js
│   │   ├── utils/auth.js
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── serverside/
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Subscription.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   └── subscribe.js
│   ├── middleware/auth.js
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
├── screenshots/
│   └── (Screenshots will be added here)
│
└── README.md
```

---

## 🖼️ Screenshots

### Desktop View
- Login Page  
- Signup Page  
- Home Page (Course List)  
- Course Detail Page (Promo Applied)  
- My Courses Page  

### Mobile View
- Login Page  
- Signup Page  
- Home Page  
- Course Detail Page  
- My Courses Page  

> Screenshots are available in the `/screenshots` folder.

---

## 📝 Environment Variables

### Backend (`serverside/.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mini-course
JWT_SECRET=your-super-secret-key
```

### Frontend (`clientside/.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

## 🚢 Deployment

### Backend (Render/Railway)
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL`

---

## 👨‍💻 Author

Built for CyberWarFare Company Assignment by Aquib Younis

---
