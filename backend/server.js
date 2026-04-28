const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const bookRoutes = require('./routes/bookRoutes');
const profileRoutes = require('./routes/profileRoutes');

// Middlewares
const { protect } = require('./middlewares/authMiddleware'); // ✅ Use destructuring to import 'protect'
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bookstoreDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes setup
app.use('/api/user', userRoutes);      // Login, signup
app.use('/api/cart', cartRoutes);      // Shopping cart
app.use('/api/books', bookRoutes);     // Book management
app.use('/api/profile', profileRoutes); // Profile

// Welcome route
app.get('/', (req, res) => {
  res.send('📚 Welcome to the BookStore API!');
});

// Protected route (example)
app.get('/protected', protect, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user._id });
});

// Global error handler
app.use(errorMiddleware);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
