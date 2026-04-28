import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookList.css';

function BookList() {
  // State variables for book data, search/filter/sort options, and category
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Science');

  const navigate = useNavigate();

  // Available book categories
  const categories = ['Science', 'Fiction', 'History', 'Technology', 'Art'];

  // Save book to backend database
  const saveBookToDB = async (book) => {
    try {
      const response = await fetch('http://localhost:5000/api/books/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        console.warn(`Skipping book "${book.title}", might already exist.`);
      }

      const savedBook = await response.json();
      console.log('Book saved to DB:', savedBook);
    } catch (error) {
      console.error('Error saving book to DB:', error);
    }
  };

  // Fetch books from Google Books API when selected category changes
  useEffect(() => {
    const fetchBooksFromGoogle = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${selectedCategory}&maxResults=20`
        );
        const data = await response.json();

        // Format the book data to match backend structure
        const formattedBooks = data.items.map((item) => ({
          bookId: item.id,
          googleId: item.id,
          title: item.volumeInfo.title || 'Unknown Title',
          author: item.volumeInfo.authors?.[0] || 'Unknown Author',
          price: Math.floor(Math.random() * 5000) + 1000, // Random price
          image: item.volumeInfo.imageLinks?.thumbnail || '',
          category: selectedCategory,
          stock: Math.floor(Math.random() * 50) + 1, // Random stock
        }));

        setBooks(formattedBooks); // Update state
        formattedBooks.forEach(saveBookToDB); // Save each book to DB
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooksFromGoogle();
  }, [selectedCategory]);

  // Filter and sort books based on search, author filter, and selected sort option
  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((book) =>
      filterAuthor ? book.author.toLowerCase().includes(filterAuthor.toLowerCase()) : true
    )
    .sort((a, b) => {
      if (sortOption === 'priceLowHigh') return a.price - b.price;
      if (sortOption === 'priceHighLow') return b.price - a.price;
      return 0;
    });

  // Navigate to the book details page
  const handleCardClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <>
      <div className="booklist-container">
        <h1>Find Your Next Favorite Book!</h1>

        {/* Search and filter controls */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by author"
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
          />
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort by</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Display filtered and sorted books */}
        <div className="book-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.bookId}
                className="book-card"
                onClick={() => handleCardClick(book.bookId)}
              >
                <img src={book.image} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>LKR {book.price}</p>
              </div>
            ))
          ) : (
            <p>No books found. Try adjusting your filters.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BookList;
