# 🚀 NextStep — Job Search & Application Tracker

**NextStep** is a modern, single-page job search and application management platform built with **Angular 21** and **NgRx**. It integrates with the [Adzuna API](https://developer.adzuna.com/) to aggregate real job listings from **19 countries**, allowing users to search, save favorites, track applications, and manage their profiles — all in one place.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [API Integration](#-api-integration)
- [State Management](#-state-management)
- [Routing & Navigation](#-routing--navigation)
- [Environment Configuration](#-environment-configuration)

---

## ✨ Features

### 🔐 Authentication
- User **registration** and **login** with email/password
- Session persistence via NgRx store
- **Auth guard** to protect private routes (favorites, applications, profile)
- Automatic session check on app initialization

### 🔍 Job Search
- Search jobs across **19 countries** (US, UK, Canada, France, Germany, Spain, and more)
- Filter by **keyword**, **location**, and **country**
- **Paginated results** with dynamic page navigation
- **Master-detail layout** — browse job list and view details side-by-side

### 💼 Job Details
- View full job description, company name, location, salary, and publication date
- Direct link to the full job offer on the original posting
- Save jobs to favorites or track applications directly from the details view

### ⭐ Favorites
- Save job listings to your personal favorites
- View all saved jobs in a dedicated favorites page
- Remove jobs from favorites
- Per-user data isolation (each user sees only their own favorites)

### 📊 Application Tracking
- Track job applications with status management: **Pending**, **Accepted**, **Rejected**
- Add personal notes to each application
- Filter applications by status
- Complete CRUD operations on tracked applications

### 👤 Profile Management
- View and edit personal information (name, email, password)
- Delete account functionality with confirmation dialog
- Avatar initials display

### 🔔 Alert System
- Global toast/alert notifications for errors and success messages
- HTTP error interceptor with user-friendly error messages
- Status-specific error handling (400, 401, 403, 404, 500, etc.)

---

## 🛠 Tech Stack

| Layer            | Technology                                                 |
| ---------------- | ---------------------------------------------------------- |
| **Framework**    | Angular 21 (Standalone Components)                         |
| **State Mgmt**   | NgRx Store + Effects + DevTools                            |
| **Styling**      | Tailwind CSS 4 + PostCSS                                   |
| **HTTP Client**  | Angular HttpClient with functional interceptors            |
| **Routing**      | Angular Router with lazy loading & component input binding |
| **Forms**        | Angular FormsModule (template-driven)                      |
| **Mock Backend** | json-server (REST API on `db.json`)                        |
| **Job Data API** | Adzuna API (real-time job listings)                        |
| **Testing**      | Vitest + jsdom                                             |
| **Language**     | TypeScript 5.9                                             |
| **Package Mgr**  | npm 11                                                     |

---

## 🏗 Project Architecture

The project follows a **feature-based modular architecture** with a clear separation of concerns:

```
┌─────────────────────────────────────────────┐
│                   App Root                  │
│         (Header + RouterOutlet + Alert)     │
├────────────┬────────────┬───────────────────┤
│   Core     │  Features  │     Shared        │
│            │            │                   │
│ • Guards   │ • Auth     │ • Alert Component │
│ • Intercep.│ • Home     │ • Pagination      │
│ • Store    │ • Jobs     │ • TimeAgo Pipe    │
│ • Services │ • Favorites│                   │
│ • Models   │ • Applic.  │                   │
│ • Layouts  │ • Profile  │                   │
│            │ • NotFound │                   │
└────────────┴────────────┴───────────────────┘
```

### Core Layer
Contains singleton services, guards, interceptors, NgRx store (actions, reducers, effects, selectors), global models, and layout components (header, footer).

### Feature Modules
Each feature is self-contained with its own components, services, models, and routing. All features are **lazy-loaded** for optimal performance.

### Shared Layer
Reusable components and pipes shared across multiple features.

---

## 📁 Folder Structure

```
nextStep/
├── public/                          # Static assets (favicon, SVGs)
├── src/
│   ├── environments/                # Environment configs (dev / prod)
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/              # Route guards (authGuard)
│   │   │   ├── interceptores/       # HTTP interceptors (errorInterceptor)
│   │   │   ├── layouts/             # Header & Footer components
│   │   │   ├── models/              # Global interfaces (User)
│   │   │   ├── services/            # Global services (AlertService)
│   │   │   └── store/
│   │   │       ├── actions/          # NgRx actions (auth, favorites, alerts, applications)
│   │   │       ├── effects/          # NgRx effects (side effects / API calls)
│   │   │       ├── reducers/         # NgRx reducers (state transitions)
│   │   │       └── selectors/        # NgRx selectors (state queries)
│   │   ├── features/
│   │   │   ├── auth/                # Login, Register + AuthService + models
│   │   │   ├── home/                # Landing page
│   │   │   ├── jobs/                # Job search, list, card, details, filters
│   │   │   │   ├── components/
│   │   │   │   │   ├── job-container/
│   │   │   │   │   ├── job-list/
│   │   │   │   │   ├── job-card/
│   │   │   │   │   ├── job-details/
│   │   │   │   │   └── search-filter-job/
│   │   │   │   ├── models/          # Job & Country models
│   │   │   │   ├── resolvers/       # Route data resolvers
│   │   │   │   └── job.service.ts   # Adzuna API integration
│   │   │   ├── favorites/           # Favorite jobs list + details + service
│   │   │   ├── applications/        # Application tracking + status mgmt
│   │   │   ├── profile/             # User profile view & edit
│   │   │   └── not-found/           # 404 page
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── alert/           # Toast alert component
│   │   │   │   └── pagination/      # Reusable pagination component
│   │   │   └── pipes/
│   │   │       └── time-ago.pipe.ts # Relative time display pipe
│   │   ├── app.ts                   # Root component
│   │   ├── app.config.ts            # App configuration (providers)
│   │   ├── app.routes.ts            # Top-level route definitions
│   │   └── app.html                 # Root template
│   ├── styles.css                   # Global Tailwind styles
│   ├── main.ts                      # Bootstrap entry point
│   └── index.html                   # HTML entry point
├── db.json                          # json-server mock database
├── angular.json                     # Angular CLI configuration
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript configuration
└── .postcssrc.json                  # PostCSS / Tailwind config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **npm** ≥ 11.x
- **Angular CLI** ≥ 21.x (`npm install -g @angular/cli`)

### Installation

```bash
# Clone the repository
git clone https://github.com/anwar-elbarry/nextStep.git
cd nextStep

# Install dependencies
npm install
```

### Running the Application

You need to start **two servers** — the mock backend and the Angular dev server:

```bash
# Terminal 1: Start the json-server mock API (port 3000)
npm run server

# Terminal 2: Start the Angular dev server (port 4200)
npm start
```

Then open your browser at **http://localhost:4200**.

---

## 📜 Available Scripts

| Command            | Description                                        |
| ------------------ | -------------------------------------------------- |
| `npm start`        | Start Angular dev server (`ng serve`)              |
| `npm run server`   | Start json-server on port 3000 (`db.json`)         |
| `npm run build`    | Build for production                               |
| `npm run watch`    | Build in watch mode (development)                  |
| `npm test`         | Run unit tests with Vitest                         |

---

## 🌐 API Integration

### Adzuna API (Job Listings)
- **Base URL:** `https://api.adzuna.com/v1/api`
- **Endpoints used:**
  - `GET /jobs/{country}/search/{page}` — Search jobs by country and page
- **Supported Countries:** Austria, Australia, Belgium, Brazil, Canada, Switzerland, Germany, Spain, France, United Kingdom, India, Italy, Mexico, Netherlands, New Zealand, Poland, Singapore, United States, South Africa

### json-server (Mock Backend)
- **Base URL:** `http://localhost:3000`
- **Endpoints:**
  - `GET/POST /users` — User registration & login
  - `PATCH/DELETE /users/:id` — Profile update & account deletion
  - `GET/POST/DELETE /favoritesOffers` — Manage favorite job listings
  - `GET/POST/PATCH/DELETE /applications` — Track job applications
  - `GET /countries` — Available country list for job search

---

## 🗄 State Management

The application uses **NgRx** for centralized state management with **4 store slices**:

| Store Slice        | Purpose                                     |
| ------------------ | ------------------------------------------- |
| `auth`             | Current user, authentication status, loading |
| `favoritesOffers`  | User's saved/favorite job listings           |
| `applications`     | Tracked job applications with statuses       |
| `alerts`           | Global alert/notification messages           |

Each slice follows the standard NgRx pattern:
- **Actions** → Define events (`auth.actions.ts`, etc.)
- **Reducers** → Handle state transitions
- **Effects** → Handle async side effects (API calls)
- **Selectors** → Query specific parts of the state

### NgRx DevTools
Enabled in development mode for state debugging and time-travel.

---

## 🗺 Routing & Navigation

| Route              | Component              | Auth Required | Description              |
| ------------------ | ---------------------- | :-----------: | ------------------------ |
| `/`                | `Home`                 | ❌            | Landing page             |
| `/login`           | `Login`                | ❌            | User login               |
| `/register`        | `Register`             | ❌            | User registration        |
| `/jobs`            | `JobContainer`         | ❌            | Job search & details     |
| `/favorites`       | `FavoritesList`        | ✅            | Saved jobs               |
| `/applications`    | `ApplicationList`      | ✅            | Application tracker      |
| `/profile`         | `Profile`              | ✅            | User profile             |
| `**`               | `NotFound`             | ❌            | 404 page                 |

All feature components are **lazy-loaded** via dynamic `import()` for optimal bundle splitting.

---

## ⚙ Environment Configuration

Environment files are located in `src/environments/`:

| Variable         | Description                        |
| ---------------- | ---------------------------------- |
| `jsonServerUrl`  | json-server base URL (default: `http://localhost:3000`) |
| `adzouna`        | Adzuna API base URL                |
| `arbetNow`       | Arbeit Now API URL (reserved)      |
| `usaJobs`        | USAJobs API URL (reserved)         |

---

## 📄 License

This project is private and not currently published under an open-source license.
