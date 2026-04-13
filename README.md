# TaskFlow — Professional Kanban Management (Frontend Task + Mock Backend)
TaskFlow is a high-performance, enterprise-grade project management application built with **React**, **TypeScript**, and **Redux Toolkit**. It features a smooth Kanban board experience with optimistic UI updates, persistent theme support, and a secure session management architecture.

## Detailed Readme is present in both backend and frontend folder
### Installation
Clone the repository

```bash
git clone https://github.com/your-username/taskflow-subhasish.git
```
### Set up Environment Variables
```bash
cd taskflow--subhasish-rathi-
```
```bash
cd frontend
cp .env
VITE_API_URL=http://localhost:4000/api/v1
```
```bash
cd ..
cd backend
cp .env
PORT=4000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

```bash
back to root folder
then run below command
```

### Launch the Application
```bash
docker compose up --build
```

### The docker will show

```bash
Frontend: http://localhost:3000
Backend API: http://localhost:5000
```

### Test User Credentials
Seeded user credentials so you can log in immediately without registering:
```
Email:    test@example.com
Password: password123
```

![Dashboard Preview](./frontend/projectimages/1.png)
![Dashboard Preview](./frontend/projectimages/15.png)

### ALL PROJECT IMAGES ARE THERE IN FOLDERS README
