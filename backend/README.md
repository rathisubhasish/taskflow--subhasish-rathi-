# TaskFlow API - Backend Mocked Documentation

This is the backend service for TaskFlow, a project management tool. It is built using **Node.js** and **Express**, utilizing a file-based JSON database for simplicity and portability while maintaining strict relational data integrity.

## 🚀 Features

- **RESTful API Design:** Follows standard HTTP methods and status codes (201 for creation, 204 for deletion, etc.).
- **JWT Authentication:** Secure access using JSON Web Tokens via a custom `authenticate` middleware.
- **Structured Validation:** Every route includes detailed field validation with standardized error responses.
- **Relational Integrity:** \* **Cascade Deletes:** Deleting a project automatically removes all associated tasks.
  - **Foreign Key Validation:** Tasks cannot be assigned to non-existent users.
- **Dynamic Filtering:** Task retrieval supports filtering by `status` and `assignee` via query parameters.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** jsonwebtoken (JWT)
- **Security:** bcryptjs (for password hashing)
- **Database:** `db.json` (File-based persistence)
- **Environment Management:** `dotenv`

---

## 📡 API Endpoints

### 1. Authentication

| Method | Endpoint             | Description                       |
| :----- | :------------------- | :-------------------------------- |
| `POST` | `/api/auth/register` | Create a new user account.        |
| `POST` | `/api/auth/login`    | Authenticate user and return JWT. |

### 2. Projects

| Method   | Endpoint            | Description                                         |
| :------- | :------------------ | :-------------------------------------------------- |
| `GET`    | `/api/projects`     | List projects (Owned or Assigned).                  |
| `GET`    | `/api/projects/:id` | Get single project + its tasks (Privacy protected). |
| `POST`   | `/api/projects`     | Create a new project.                               |
| `PATCH`  | `/api/projects/:id` | Update project details (Owner only).                |
| `DELETE` | `/api/projects/:id` | Delete project and all its tasks (Owner only).      |

### 3. Tasks

| Method   | Endpoint                  | Description                                         |
| :------- | :------------------------ | :-------------------------------------------------- |
| `GET`    | `/api/projects/:id/tasks` | Get filtered tasks using `?status` and `?assignee`. |
| `POST`   | `/api/projects/:id/tasks` | Create task within a project.                       |
| `PATCH`  | `/api/tasks/:id`          | Update task (Enum validation).                      |
| `DELETE` | `/api/tasks/:id`          | Delete task (Owner or Creator only).                |

---

## 🧠 Key Architectural Decisions

### 1. Relational Privacy (The "Wall")

Unlike open systems, our `GET /projects/:id` route implements a security wall. A project is only accessible if the user is the **Owner** or is **Assigned at least one task** within that project. This prevents unauthorized users from snooping on project data even if they guess the ID.

### 2. Open Collaboration Logic

To support a team environment, we moved away from a "Project Owner Only" model for tasks. While projects are owned by one person, **tasks have their own creators**. This allows multiple users to contribute to a project while ensuring the Project Owner maintains final control over the project itself.

### 3. Cascade Deletion & Orphan Prevention

To prevent data corruption in our `db.json`, we implemented manual cascade deletes. Deleting a project triggers a secondary filter on the tasks array, ensuring no "ghost tasks" remain. Similarly, task creation validates the `assignee_id` against the users database to ensure relational integrity.

### 4. Environment-Based Configuration

Sensitive data (JWT Secrets and Port numbers) is decoupled from the source code using `.env` files. This ensures that the application can be safely deployed across different environments (Development, Testing, Production) without exposing credentials.

---

## ⚠️ Error Response Standard

All validation errors follow a consistent structure:

```json
{
  "error": "validation failed",
  "fields": {
    "title": "is required",
    "assignee_id": "user does not exist"
  }
}
```

---

## 🛠️ Development Setup

1.  **Install dependencies:** `npm install`
2.  **Environment Variables:** Create a `.env` file:
    ```env
    PORT=4000
    JWT_SECRET=your_super_secret_key
    ```
3.  **Run the server:** `npm run dev`

---

### Author

**Subhasish Rathi** _Software Development Engineer_

rathisubhasish@gmail.com
