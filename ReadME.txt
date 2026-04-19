#### R.A. Charith Gayashan Deshapriya - Skyrek Full Stack Batch 06 - Reg.No. : FSDC6642

# Task Manager Web App

A full-stack task management application that allows users to manage daily tasks efficiently with authentication and modern UI.

## Tech Stack
- Frontend: Next.js, React, TypeScript, Tailwind, shadcn/ui
- Backend: Node.js, Express, MongoDB (Atlas)

## Features
- User Authentication (Login/Register)
- Task Management CRUD
- Dark mode Support
- Forgot & Reset Password (token-based flow)
- User Profile Management

## Setup

1. Clone repository
git clone https://github.com/charithgaya/TaskManagerWeb.git
cd TaskManagerWeb

2. Backend Setup

cd backend
npm install
npm start

create .env file
PORT=8000
MONGO_URI=
JWT_SECRET=
CLIENT_URL=http:localhost:8000

3. Frontend Setup

cd client
npm install
npm run dev

create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:8000

#Deployment

Frontend-Vercel
Backend-Railway
Database-MongoDB Atlas

## Live Demo
https://task-manager-web-j7pt.vercel.app

## API Base URL
https://taskmanagerweb-production.up.railway.app

#Future Improvements

- Send real password reset emails
- Social Login (Gmail / Github)
- Profile picture upload
- Improve mobile responsiveness
- Notifications & reminders