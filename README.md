# Employee Management System (Full Stack Application)

## Project Overview

This is a full-stack employee management system built using a **Node.js** backend with **MongoDB** for data storage and a **React.js** frontend. The application allows users to perform CRUD operations (Create, Read, Update, and Delete) on employee data, with the ability to upload images, handle authentication, and manage user roles.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Technologies Used

- **Frontend**: React.js, Axios, React Router, Bootstrap
- **Backend**: Node.js, Express.js, Mongoose, JWT (JSON Web Tokens), Multer (for file uploads)
- **Database**: MongoDB
- **Other Libraries**: Concurrently, Nodemon, bcryptjs, js-cookie, JWT, etc.

---

## Project Structure

```bash
emp-management/
│
├── backend/             # Node.js backend server
│   ├── controllers/     # Express route controllers for managing employee and user logic
│   ├── models/          # Mongoose models for defining database schemas
│   ├── routes/          # API routes for user authentication and employee CRUD
│   ├── uploads/         # Uploaded employee images
│   ├── server.js        # Entry point for the Node.js server
│
├── frontend/            # React.js frontend application
│   ├── public/          # Static files (index.html, icons, etc.)
│   ├── src/             # React component files, styles, and logic
│   ├── src/components/  # Individual components (Login, Dashboard, EmployeeList, etc.)
│   ├── src/styles/      # CSS/SCSS files for styling
│   ├── src/App.js       # Main app component
│   └── src/index.js     # Entry point for React frontend
│
├── package.json         # Project metadata and dependency management
├── package-lock.json    # Automatically generated file for locking node modules
└── README.md            # Documentation
