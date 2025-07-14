# 🧠 DoitNow Task Manager Web App

A full-stack task management web application built with **React (Vite)** on the frontend and **Node.js + Express** with **MongoDB** on the backend. The app allows users to register, log in, and manage their personal tasks efficiently with filtering, sorting, and CRUD operations.

---

## 📁 Project Structure

/task-manager-app
├── frontend/ → Vite + React app (UI)
├── backend/ → Node.js + Express API (REST)
├── .gitignore
├── README.md → [You're here]

Each folder contains its own `README.md` with detailed setup instructions.

---

## 🚀 Key Features

- 🔐 User authentication with JWT
- ✅ Full CRUD for tasks (Create, Read, Update, Delete)
- 🔍 Filter and sort tasks by status/date
- 📦 Modular REST API with Express
- 🌈 Responsive UI using Tailwind CSS
- 🧠 State management with Context API / Zustand
- 🌐 Live deployed version (optional)

---

## ⚙️ Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React (Vite), Tailwind CSS          |
| Backend  | Node.js, Express.js                 |
| Database | MongoDB + Mongoose                  |
| Auth     | JWT (JSON Web Tokens)               |
| Hosting  | Vercel (frontend), Render (backend) |

---

## 📦 Setup Instructions

Each folder has its own setup guide:

- 👉 [Frontend Setup Guide](./frontend/README.md)
- 👉 [Backend Setup Guide](./backend/README.md)

Make sure to:

- Install dependencies in both folders
- Create appropriate `.env` files (see each README)
- Run both servers concurrently (`npm run dev` or similar)

---

## 🌍 Live Demo

[🔗 View Deployed App](https://your-deployed-url.com)

---

## 🐳 Docker Support

If Docker is enabled, you can run the entire stack with:

```bash
docker-compose up --build
```

## 🙏 Credits

Developed by Thuverakan Tharumakulasooriyan
[LinkedIn](https://www.linkedin.com/in/thuverakan10/)
