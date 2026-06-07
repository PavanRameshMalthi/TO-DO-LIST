# 📋 Personal Todo App — Full Stack

React + Express + MongoDB Todo Application

## Folder Structure

```
MINI PROJ/
├── backend/
│   ├── config/
│   │   └── db.js                 ← MongoDB connection
│   ├── controllers/
│   │   └── todoController.js     ← All CRUD logic
│   ├── models/
│   │   └── Todo.js               ← Mongoose schema
│   ├── routes/
│   │   └── todoRoutes.js         ← API routes
│   ├── .env                      ← Environment variables
│   ├── package.json
│   └── server.js                 ← Express entry point
│
└── frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── AddTaskForm.jsx    ← Task input form
    │   │   ├── Notification.jsx  ← Alert messages
    │   │   ├── StatsBar.jsx      ← Stats cards
    │   │   └── TodoItem.jsx      ← Single task row
    │   ├── App.css
    │   ├── App.jsx               ← Main component
    │   ├── index.css
    │   └── main.jsx              ← React entry point
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Setup

### Backend
```bash
cd backend
npm install
# Edit .env with your MongoDB URI
npm run dev        # dev mode with nodemon
npm start          # production
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Reference

| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| GET    | /api/todos                  | Get all todos           |
| GET    | /api/todos?filter=Pending   | Filter by status        |
| GET    | /api/todos?search=text      | Search todos            |
| POST   | /api/todos                  | Create todo             |
| PUT    | /api/todos/:id              | Update todo             |
| PATCH  | /api/todos/:id/toggle       | Toggle completed        |
| DELETE | /api/todos/:id              | Delete todo             |

## .env (backend)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/todoapp
CLIENT_URL=http://localhost:5173
```
