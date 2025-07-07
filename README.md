
# 🧠 Second Brain

Second Brain is a note-taking website that quickly stores tweets, YouTube videos, and short notes so you can remember them later.

---

## ✨ Features

* **Add Content**
  Store content of specific types:

  * YouTube videos
  * X / Twitter posts
  * Documents
  * Short notes

* **Filter Content**
  Easily filter and browse your saved items with a sidebar menu.

* **Share Your Brain**
  Share your collection with others.

---

## ⚙️ Tech Stack

* **Frontend:** React, TypeScript, Tailwind CSS
* **Backend:** Node.js, Mongoose
* **Authentication:** JWT-based Auth

---

## 🚀 Setup Instructions

This project is split into **two separate repositories**: frontend and backend.

### 1️⃣ Clone Repositories

Clone each repository:

```bash
# Frontend
git clone https://github.com/rafool05/second-brain-frontend.git

# Backend
git clone https://github.com/rafool05/second-brain-backend.git
```

---

### 2️⃣ Install Dependencies

Navigate into each folder and install dependencies:

```bash
# Frontend
cd second-brain-frontend
npm install

# Backend
cd ../second-brain-backend
npm install
```

---

### 3️⃣ Configure Environment Variables

**Backend** `.env`:

```
DB_url=mongodb://localhost:27017/secondbrain
JWT_SECRET=your_secret_key
```

Make sure your MongoDB instance is running locally or provide a connection string to your cloud database.

---

### 4️⃣ Start Development Servers

In **two separate terminals**, start each server:

```bash
# Frontend
cd second-brain-frontend
npm run dev
```

```bash
# Backend
cd second-brain-backend
npm run dev
```

---

### 5️⃣ Access the Application

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend API: [http://localhost:5000](http://localhost:5000)

---


## ✨ Contact

For questions or feedback, please reach out via rj05jain@gmail.com
