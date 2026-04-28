# 📚 Online Bookshop System with API Integration

## 🚀 Project Overview
The **Online Bookshop System** is a full-stack web application developed to simulate an online e-commerce platform for books. It integrates external book APIs and provides secure authentication, shopping cart functionality, and order management.

Users can browse books, search and filter results, view detailed information, add items to cart, and complete purchases with a smooth and responsive user experience.

---

## ✨ Features

### 🔐 User Authentication System
- User Registration (Sign Up)
- User Login (Email/Username)
- JWT-based authentication
- Password encryption using bcrypt
- Secure session management
- Protected routes

---

### 📖 Book Management Module
- Integration with external APIs (Google Books API / Open Library API)
- Display book details:
  - Title
  - Author
  - Description
  - Price 
- Search functionality
- Filter and sorting options
- Detailed book view page

---

### 🛒 Shopping Cart System
- Add books to cart
- Remove books from cart
- Update quantity
- Real-time total price calculation
- Persistent cart per user

---

### 💳 Checkout & Order System
- Shipping information form
- Order summary page
- Order confirmation
- Invoice generation
- Order history tracking

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js

### Database
- MongoDB / MySQL

### Authentication & Security
- JWT Authentication
- bcrypt password hashing
- Input validation & sanitization

### API Integration
- Google Books API / Open Library API
- RESTful API architecture

---

## 📡 API Endpoints

### 🔐 Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`

### 📖 Books
- GET `/api/books`
- GET `/api/books/:id`

### 🛒 Cart
- POST `/api/cart`
- GET `/api/cart`
- PUT `/api/cart/:id`
- DELETE `/api/cart/:id`

### 💳 Orders
- POST `/api/orders`
- GET `/api/orders`

---

🔐 Security Features
-JWT authentication for secure login
-Password encryption using bcrypt
-Input validation & sanitization
-Protected API routes
-Secure session handling
