const Book = require('../models/Book');

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Fetch books from MongoDB
    res.json(books); // Send books as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

// Add a new book
const addBook = async (req, res) => {
  const { title, author, price, image, category } = req.body;

  try {
    const newBook = new Book({ title, author, price, image, category });
    await newBook.save(); // Save the new book to the database
    res.status(201).json(newBook); // Return the saved book with 201 status
  } catch (error) {
    res.status(500).json({ message: 'Error saving book to database', error: error.message });
  }
};

module.exports = {
  getBooks,
  addBook,
};
