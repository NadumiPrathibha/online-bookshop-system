const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post('/add', async (req, res) => {
  const { bookId, googleId, title, price, stock } = req.body;

  if (!bookId || !googleId || !title || !price || !stock) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newBook = new Book({ bookId, googleId, title, price, stock });
  const savedBook = await newBook.save();
  res.status(201).json(savedBook);
});

module.exports = router; // <-- Don't forget this line!
