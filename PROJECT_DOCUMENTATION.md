# 🛋️ Modern Furniture Catalog - The Ultimate Developer Guide

Welcome to the definitive technical documentation for the **Furniture Website Design Final** project. This document serves as a comprehensive manual for developers, detailing the architecture, codebase, data flow, and integrations.

---

## 📑 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Architecture & Stack](#2-architecture--stack)
3. [Deep Dive: Backend Logic](#3-deep-dive-backend-logic)
4. [Deep Dive: Frontend Logic](#4-deep-dive-frontend-logic)
5. [Database Schema & Seeding](#5-database-schema--seeding)
6. [API Reference (Endpoints)](#6-api-reference-endpoints)
7. [Setup & Installation](#7-setup--installation)

---

## 1. Project Overview

**Modern Furniture Catalog** is a full-stack web application designed to showcase a premium furniture collection. It features a responsive React frontend for browsing products and a robust Node.js backend for managing authentication and inquiries.

### Key Features
*   **Dynamic Product Catalog**: Browse grouped collections (Beds, Sofas, Chairs, Dining).
*   **Secure Authentication**: OTP-based email verification for new user registration.
*   **Interactive UI**: Smooth animations, image modals, and responsive design.
*   **Contact System**: Direct inquiry form integrated with email services.

---

## 2. Architecture & Stack

The system follows a **decoupled client-server architecture**.

### 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React 18** | UI Library (via Vite) |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework |
| **UI Kit** | **Radix UI** | Headless accessible components |
| **Backend** | **Node.js + Express** | REST API Server |
| **Database** | **SQLite** | Serverless, zero-configuration SQL database |
| **Auth** | **JWT + bcrypt** | Stateless authentication & password hashing |

### 🔄 System Architecture Diagram

```mermaid
graph TD
    User[End User]
    
    subgraph Client [Frontend (Port 3000)]
        App[App.tsx]
        AuthModal[AuthModal Component]
        ProductGrid[ProductSection Component]
    end
    
    subgraph Server [Backend (Port 5000)]
        API[Express API]
        AuthCtrl[Auth Controller]
        ProdCtrl[Product Controller]
        EmailSvc[Nodemailer Service]
    end
    
    subgraph Data [Persistence]
        DB[(SQLite File)]
    end
    
    User -->|Interacts| Client
    Client -->|HTTP /fetch| API
    API -->|SQL Query| DB
    API -->|SMTP| EmailSvc
```

---

## 3. Deep Dive: Backend Logic (`server/`)

The backend is built as a single monolithic Express application in `server/index.js`.

### 📂 `server/index.js` Analysis

1.  **Initialization & Middleware** (Lines 1-16):
    *   Imports `express`, `sqlite3`, `bcryptjs` (security), `jsonwebtoken` (auth), and `cors`.
    *   Configures CORS to allow requests from the frontend (Port 3000).

2.  **Database Connection & Seeding** (Lines 18-155):
    *   Connects to `./database.sqlite`.
    *   **Auto-Migration**: Creates `users` and `products` tables if they don't exist.
    *   **Auto-Seeding**: Checks if the product count is low (<10). If so, it *automatically* populates the database with ~80 high-quality product entries (Beds, Sofas, Chairs, etc.) with Cloudinary image URLs.

3.  **Authentication Routes** (Lines 160-262):
    *   `POST /register/send-otp`: 
        *   Checks if user exists.
        *   Generates a 6-digit OTP.
        *   Hashes the password.
        *   Stores the temp user state in the DB.
        *   Sends email via `sendOtpEmail`.
    *   `POST /register/verify-otp`:
        *   Validates the OPT.
        *   Marks `is_verified = 1`.
        *   Issues a JWT token.
    *   `POST /login`:
        *   Finds user -> Compares password hash -> Checks verification status -> Issues JWT.

4.  **Utility Routes** (Lines 265-311):
    *   `GET /products`: returns `SELECT * FROM products`.
    *   `POST /contact`: Uses `nodemailer` to send an admin email with the user's message.

---

## 4. Deep Dive: Frontend Logic (`src/`)

### 📂 `src/App.tsx` (The Orchestrator)
The root component that composes the page structure. It renders the `Navbar`, `Hero`, and multiple instances of `ProductSection` (one for each category: Beds, Sofas, Chairs, Dining), followed by the `ContactSection` and `Footer`.

### 📂 `src/components/AuthModal.tsx` (The Gatekeeper)
This complex component handles the entire user onboarding flow.
*   **State Machine**:
    *   `isLogin`: Toggles between "Login" and "Sign Up" forms.
    *   `showOtpInput`: If true, hides the registration form and shows the OTP verification field.
*   **UI Logic**: Uses Radix UI `Dialog` for the modal and `Tabs` for switching contexts.
*   **Network Logic**: Calls `fetch` to hit the backend auth endpoints and manages `localStorage` for token persistence.

### 📂 `src/components/ProductSection.tsx` (The Catalog)
A smart, reusable component that fetches *all* products but displays only relevant ones.
*   **Filtering**: Accepts a `props.id` (e.g., "beds"). It maps this ID to the backend category (e.g., "Bedroom") and filters the global product list.
*   **Interactivity**: 
    *   Hover effects using `framer-motion`.
    *   "Quick View" implementations using a nested `Dialog`.

### 📂 `src/components/ContactSection.tsx` (The Communication Link)
*   **Validation**: Ensures Name, Email, and Message are present.
*   **Integration**: POSTs data to `/api/contact`.
*   **Feedback**: Uses `sonner` to show Success/Error toast notifications.

---

## 5. Database Schema & Seeding

### 🗄️ Users Table (`users`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PK | Unique ID |
| `email` | TEXT UNIQUE | User's email address |
| `password` | TEXT | Bcrypt hashed password |
| `name` | TEXT | Full name |
| `otp` | TEXT | Temporary 6-digit code |
| `is_verified` | INTEGER | 0 = Unverified, 1 = Verified |

### 🗄️ Products Table (`products`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PK | Unique ID |
| `name` | TEXT | Product Name (e.g., "Velvet Bed") |
| `category` | TEXT | "Bedroom", "Sofas", "Chairs", "Dining" |
| `price` | REAL | (Currently stored as 0 in seed) |
| `image` | TEXT | Cloudinary URL |
| `itemCode` | TEXT | SKU (e.g., "AFI009") |

---

## 6. API Reference (Endpoints)

### 🔐 Auth Module
<details>
<summary><b>POST /api/register/send-otp</b></summary>

*   **Role**: Step 1 of Registration
*   **Body**: `{ "name": "...", "email": "...", "password": "..." }`
*   **Action**: Creates unverified user record, emails OTP.
</details>

<details>
<summary><b>POST /api/register/verify-otp</b></summary>

*   **Role**: Step 2 of Registration
*   **Body**: `{ "email": "...", "otp": "123456" }`
*   **Action**: Verifies code, activates account, returns JWT.
</details>

<details>
<summary><b>POST /api/login</b></summary>

*   **Role**: User Login
*   **Body**: `{ "email": "...", "password": "..." }`
*   **Action**: Authenticates and returns JWT.
</details>

### 📦 Data Module
<details>
<summary><b>GET /api/products</b></summary>

*   **Role**: Fetch Catalog
*   **Response**: `{ "message": "success", "data": [ ...product_objects ] }`
</details>

---

## 7. Setup & Installation

Follow these steps to deploy the application locally.

### Step 1: Backend Setup
1.  Navigate to server: `cd server`
2.  Install dependencies: `npm install`
3.  Configure Environment (Create `.env` file):
    ```env
    PORT=5000
    SECRET_KEY=mysecretkey
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    ```
4.  Start Server: `node index.js`
    *   *Result*: Server starts on Port 5000. Database is created and seeded.

### Step 2: Frontend Setup
1.  Navigate to root (new terminal): `cd ..`
2.  Install dependencies: `npm install`
3.  Start Dev Server: `npx vite`
    *   *Result*: Application launches at `http://localhost:3000`.

---
*Documentation generated for **Furniture Website Design Final** project.*
