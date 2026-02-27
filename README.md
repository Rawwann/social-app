# 📱 Social Media Web App

A modern social media application built as a learning project with React, Vite, HeroUI and React Query. This repository demonstrates a full front-end integration with the [Route Academy Route-Posts API](https://route-posts.routemisr.com) for authentication, posts, comments, and profile management.

---

## 🚀 Project Overview

This app provides a minimal yet functional social networking experience. Users can register/login, create and interact with posts, add comments, and manage their personal profile. The front end is built using React and styled with HeroUI components, while data fetching and state synchronization are powered by React Query.

---

## ✨ Features

- 🔐 **Authentication** – Sign up, log in and handle token storage using context.
- 📝 **Post Management** – Create, read, update and delete posts.
- 💬 **Comments** – Add, edit and remove comments on posts.
- 👤 **Profile** – View profile details, list own posts, and navigate between users.
- 📈 **React Query** – Efficient data fetching with caching and query invalidation.
- ⚠️ **Offline Detection** – Alerts the user when network connection is lost.

---

## 🧰 Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Framework    | React (v19)                    |
| Build Tool   | Vite                           |
| UI Library   | HeroUI React components        |
| State/Server | React Query (@tanstack/react-query) |
| Styling      | Tailwind CSS (via HeroUI)      |
| Routing      | React Router v7                |
| Forms        | React Hook Form + Zod          |
| HTTP Client  | Axios                          |
| Icons        | React Icons                    |

---

## 🛠 How to Run the Project

1. **Clone the repository**
   ```bash
   git clone <repo-url> "Social App"
   cd "Social App/Social App"
   ```
2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Start the development server**
   ```bash
   npm run dev
   ```
4. **Open the app**
   Visit `http://localhost:5173` (or the port displayed by Vite) in your browser.

> Make sure you have a valid API token by registering a new user and logging in; tokens are stored in `localStorage`.

---

Feel free to explore the code, extend features or integrate with your own backend.