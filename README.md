# 🧑‍💻 Team Manager App – Next.js Assignment

This is a responsive, user-friendly web application built with **Next.js (App Router)**, **Tailwind CSS**, and **shadcn/ui**, designed to simulate a basic team management system.

---

## 🔧 Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** React Hooks and Local Storage

---

## 🚀 Features

### ✅ Authentication

- Login screen (Register not required)
- Stores user data in **LocalStorage**
- Implements **protected routes** — Teams and Profile are hidden unless logged in

### 👥 Teams Screen

- Displays all available teams with:
  - Team name
  - Leader
  - Member count
  - Remaining spots
  - Join Team button
- **Pagination** (6 teams per page)
- **Search** (by team name)
- **Filter** (by team size using checkboxes)
- **Sort** (by available spots)
- Highlights when **user has joined** a team
- Prevents:
  - Joining a full team
  - Joining more than one team

### 🙍‍♂️ Profile Screen

- Displays:
  - User info: name, avatar, email, role, location
  - Skill sets
  - Joined team, teammates, and project idea
- Responsive layout

---

## 📦 Dummy Data

- Teams and user data are mocked using hardcoded JSON in `mock-data.ts`
- No server or API integration is required

