# 📚 Online Bookshop System with API Integration

## 🚀 Project Overview

This is a full-stack web application for an **Online Bookshop System** that integrates with external APIs and provides secure user authentication.

The system allows users to browse books, manage a shopping cart, and complete purchases with a smooth checkout process.

---

## 🧠 Features

### 🔐 User Authentication

* User Registration & Login
* JWT-based authentication
* Password encryption
* Session management

### 📖 Book Management

* Fetch books using external APIs (Google Books API / Open Library API)
* Search, filter, and sort books
* View detailed book information

### 🛒 Shopping Cart

* Add/remove books
* Update quantity
* Persistent cart storage

### 💳 Checkout

* Shipping details
* Order confirmation
* Invoice generation

---

## 🛠️ Technologies Used

### Frontend

* React.js
* HTML5, CSS3, JavaScript

### Backend

* Node.js
* Express.js
* MongoDB / MySQL
* JWT Authentication

### API Integration

* Google Books API / Open Library API

---

## 🔐 Security Features

* JWT Authentication
* Password hashing (bcrypt)
* Input validation & sanitization

---

## 📡 API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Books

* GET /api/books
* GET /api/books/:id

### Cart

* POST /api/cart
* GET /api/cart
* DELETE /api/cart/:id

### Orders

* POST /api/orders
* GET /api/orders

---

