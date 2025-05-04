# Habit Tracker

A simple web-based habit tracking application built with:

- **Frontend:** Vanilla JavaScript, HTML, CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (running in Docker)

---

## ✨ Features

✅ Track daily habits by entering minutes spent per day  
✅ View habits across the week with a dynamic frontend table  
✅ Add new habits or mark habits for removal  
✅ Persist habit data to a PostgreSQL backend  
✅ Navigate between different date ranges  
✅ API architecture organized with a dedicated `ApiService` class

---

## 🏗 Project Structure

```graphql
.
├── backend
│   ├── node_modules/               # Backend dependencies
│   ├── package.json                # Backend package manifest
│   ├── package-lock.json           # Backend lockfile
│   ├── server.js                   # Express server
│   └── postgresQueries.sql         # SQL schema and queries
├── frontend
│   ├── index.html                  # Main frontend page
│   ├── style.css                   # Frontend styles
│   ├── app.js                      # Frontend entry script
│   ├── Habit.js                    # Habit class
│   ├── HabitTable.js               # Table manager class
│   ├── HabitTrackerApp.js          # Main app controller
│   └── Cursor.js                   # Optional cursor effects (if used)
├── docker-compose.yml              # Docker Compose configuration
├── docs/
│   └── HTSchema.png                # Database or app schema diagram
└── README.md                       # Project documentation (this file)
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Setup

#### 1️⃣ Clone the repository:

```bash
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker
```

#### 2️⃣ Start the database and backend using Docker:

```bash
docker-compose up
```

#### 3️⃣ Open the frontend:

Serve frontend/index.html using a local web server (or open directly in the browser).

### ⚙️ API Endpoints

| Method | Route                               | Description                                              |
| ------ | ----------------------------------- | -------------------------------------------------------- |
| POST   | `/api/habits`                       | Get current habits for a user by email (in request body) |
| GET    | `/api/habits/:userId/:dateLookupId` | Get habits for a specific user and date lookup ID        |
| PUT    | `/api/habits/:userId/:dateLookupId` | Update multiple habits’ durations for a user and date    |
| POST   | `/api/habit/:userId/:dateLookupId`  | Add a new habit for a user and date (habit name in body) |
| DELETE | `/api/habits/:userId/:dateLookupId` | Delete selected habits for a user and date (IDs in body) |

### 🛠 Technologies Used

Node.js + Express
PostgreSQL
Docker + Docker Compose
Vanilla JavaScript (frontend)
HTML5, CSS3

### 📌 Future Improvements

Convert frontend to TypeScript
Add user authentication
Add real-time syncing or WebSocket support
Improve frontend validation and UI/UX
Write unit and integration tests

### 📝 License

This project is licensed under the MIT License.

Last Update: 5/4/25
