# TaskFlow — Professional Kanban Management

TaskFlow is a high-performance, enterprise-grade project management application built with **React**, **TypeScript**, and **Redux Toolkit**. It features a smooth Kanban board experience with optimistic UI updates, persistent theme support, and a secure session management architecture.

![Dashboard Preview](./projectimages/15.png)

### ALL PROJECT IMAGES ARE MENTIONED AT THE END

## 🚀 Key Features

- **Kanban Board Engine:** Full **Drag & Drop** task updates using `@hello-pangea/dnd` with specialized columns for `Todo`, `In-Progress`, and `Completed`.
- **Collaborative Access:** Shared project access and task assignment functionality.
- **Multi-Project Management**: Create and manage multiple projects. Projects are visible to you if you are the Owner or if you have at least one Task Assigned to you within that project.
- **Granular Task Control**: Create, edit, and track unlimited tasks. While any user can update a task's status or details, deletion is restricted to the original task creator.
- **Project Ownership**: Only the Project Owner has the specific permissions required to update or delete the project itself.
- **Effortless Deletion**: Built-in capability to remove individual tasks or entire projects (including all nested data) with a single action to keep your workspace clean.
- **Optimistic UI Updates:** Seamless task transitions and status updates that reflect immediately in the UI while syncing with the backend.
- **Advanced Filtering:** Real-time task filtering by Search Query, Priority, Assignee, and Time (Today/Overdue).
- **Theming System:** System-integrated **Dark Mode toggle** with semantic CSS variables and dynamic UI configurations.
- **Responsive Architecture:** Fully **responsive on all devices** (Mobile, Tablet, Desktop), including a floating action button (FAB) for mobile task creation.
- **Resilient Error Handling:** Global and component-level error handling for 404s, 500s, and network failures.

---

## 🏗 Architecture & Design Patterns

### 1. The "Nuclear" Logout Pattern

To ensure maximum security, we implemented a **Root Reducer Reset**. This pattern intercepts the `auth/logout` action to wipe the entire Redux state tree and clear `localStorage`.

### 2. Senior-Level Coding Standards

- **Clean Code:** Strict adherence to naming conventions, modular structure, and **Separation of Concerns (SoC)**.
- **No "God Functions":** Logic is broken down into small, reusable, and reviewable utility functions and custom hooks.
- **Protected Routes:** Frontend guarding via an `AuthGuard` to prevent unauthorized access to private views.

### 3. Performance & Data

- **Optimized Rendering:** Minimized re-renders using memoization and efficient state selectors.
- **Mock DB:** Built-in Mock Database support for seamless development and testing.

---

## 📱 Core Modules & Views

| Module              | Features & Functionality                                                                        |
| :------------------ | :---------------------------------------------------------------------------------------------- |
| **Auth System**     | Login / RegisterForm with client-side validation, error handling, and JWT storage.              |
| **Projects List**   | Show all accessible projects with a dedicated button to create new projects.                    |
| **Project Detail**  | Tasks listed or grouped by status; filterable by status and assignee.                           |
| **Task Management** | Create/Edit via Modal or side panel — includes title, status, priority, assignee, and due date. |
| **Navbar**          | Displays logged-in user's name, Dark mode toggle, and a secure logout button.                   |

---

## 🛠 Tech Stack

| Category             | Technology                             |
| :------------------- | :------------------------------------- |
| **Framework**        | React 18 (Vite)                        |
| **Language**         | TypeScript                             |
| **State Management** | Redux Toolkit (RTK)                    |
| **Styling**          | Tailwind CSS + Dynamic Config          |
| **Drag & Drop**      | @hello-pangea/dnd                      |
| **API Handling**     | Axios + Custom Hooks (Mock DB support) |

---

## 📂 Project Structure

````text
## 📂 Project Structure

The project follows a **Feature-Based (Domain-Driven)** modular architecture to ensure high scalability and easy maintenance.

```plaintext
src/
├── api/                # Global API instances and interceptors
├── components/         # Shared UI (Button, Modal, Skeleton, DarkModeToggle)
├── features/           # Domain-driven modules
│   ├── auth/           # Authentication
│   │   ├── components/ # Login/Register forms
│   │   ├── hooks/      # useAuth specific logic
│   │   ├── apiFolder/       # Auth-specific endpoints
│   │   └── types/      # Auth interfaces
│   ├── projects/       # Dashboard and Project management
│   │   ├── components/ # Project cards, Dashboard UI
│   │   ├── hooks/      # useProjects logic
│   │   ├── apiFolder/       # Project-specific endpoints
│   │   └── types/      # Project interfaces
│   └── tasks/          # Kanban board, Task cards, and Filters
│       ├── components/ # Kanban columns, Task cards
│       ├── hooks/      # useTasks and Drag-and-Drop logic
│       ├── apiFolder/       # Task-specific endpoints
│       └── types/      # Task interfaces
├── hooks/              # Global utility hooks (useNotify, useUsers, useTheme)
├── store/              # Redux logic (Slices & Root Reducer)
├── types/              # Global TypeScript interfaces
├── routes/             # App routing and route definitions
└── utils/              # Helpers (Debounce, Formatters, Status Constants)



````





### Project Images
![Dashboard Preview](./projectimages/1.png)
![Dashboard Preview](./projectimages/2.png)
![Dashboard Preview](./projectimages/3.png)
![Dashboard Preview](./projectimages/4.png)
![Dashboard Preview](./projectimages/5.png)
![Dashboard Preview](./projectimages/6.png)
![Dashboard Preview](./projectimages/7.png)
![Dashboard Preview](./projectimages/8.png)
![Dashboard Preview](./projectimages/9.png)
![Dashboard Preview](./projectimages/10.png)
![Dashboard Preview](./projectimages/11.png)
![Dashboard Preview](./projectimages/12.png)
![Dashboard Preview](./projectimages/13.png)
![Dashboard Preview](./projectimages/14.png)
![Dashboard Preview](./projectimages/15.png)
![Dashboard Preview](./projectimages/16.png)
![Dashboard Preview](./projectimages/17.png)
![Dashboard Preview](./projectimages/18.png)
![Dashboard Preview](./projectimages/19.png)
![Dashboard Preview](./projectimages/20.png)
![Dashboard Preview](./projectimages/21.png)
![Dashboard Preview](./projectimages/22.png)
![Dashboard Preview](./projectimages/23.png)
![Dashboard Preview](./projectimages/24.png)
![Dashboard Preview](./projectimages/25.png)
![Dashboard Preview](./projectimages/26.png)
![Dashboard Preview](./projectimages/27.png)
![Dashboard Preview](./projectimages/28.png)
![Dashboard Preview](./projectimages/29.png)
![Dashboard Preview](./projectimages/30.png)
![Dashboard Preview](./projectimages/31.png)
