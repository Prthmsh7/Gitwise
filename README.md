# 🚀 Gitwise

Gitwise is a **cloud-based collaborative platform** that empowers developers to seamlessly edit, analyze, and contribute to open-source repositories. With built-in AI-powered code suggestions, repository insights, and a cloud IDE, Gitwise streamlines the development process and enhances collaboration.

---

## 🔥 Features
- **Authentication** – Secure login & access control.
- **GitHub Profile & Repo Fetching** – View repositories & user profiles.
- **Smart Filtering** – Search & filter repositories with ease.
- **Cloud-Based IDE** – Edit & manage repositories in the cloud.
- **AI-Powered Code Assistance** – Get explanations, suggestions & improvements.
- **Pull Request Comparison** – Compare different PRs to make informed decisions.
- **Real-time Collaboration (Upcoming)** – Multi-user coding environment.

---
[![Gitwise][product-screenshot]](https://example.com)
---

## 🛠️ Installation & Setup

### 📌 Prerequisites
- **Node.js** and **npm** installed.
- **GitHub API Access Token** (if required for fetching repositories).

### 📥 Clone the Repository
* bash
  ```bash
  git clone https://github.com/yourusername/gitwise.git
  cd gitwise
  ```

## 📦 Install Dependencies
Run the following command to install the necessary packages for both client and server:
### Gitwise Dashboard
* frontend
  ```bash
  cd frontend
  npm i
  npm run dev
  ```
* backend
  ```bash
  cd backend
  npm i
  npm start
  ```
### Cloud-IDE
* client
  ```bash
  cd cloud-ide
  cd client
  npm i
  npm run dev
  ```
* server
  ```bash
  cd cloud-ide
  cd server
  npm i
  npm run dev
  ```

### Setup .env file

```js
PORT=5000
MONGO_URI=
GITHUB_API_KEY=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLIENT_BASE_URL=
```

### Build the app

```shell
npm run build
```

### Start the app

```shell
npm start
```
## 🎥 Introductory Presentation

[![Watch the Introductory Presentation](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
