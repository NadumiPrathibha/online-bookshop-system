import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar'; // Importing Navbar component
import './BookDetails.css';

const BookDetails = () => {
  // Get the book ID from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  // Local state to hold book details and stock count
  const [book, setBook] = useState(null);
  const [stock, setStock] = useState(10); // Initial stock value

  // Get the addToCart function from Cart context
  const { addToCart } = useCart();

  // Fetch book details from Google Books API when the component loads
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();

        // Format the fetched data to match the app's requirements
        const formattedBook = {
          id: data.id,
          title: data.volumeInfo.title || 'Unknown Title',
          author: data.volumeInfo.authors?.[0] || 'Unknown Author',
          description: data.volumeInfo.description || 'No description available',
          image: data.volumeInfo.imageLinks?.thumbnail || '',
          price: Math.floor(Math.random() * 5000) + 1000, // Random price
          category: data.volumeInfo.categories?.[0] || 'Unknown Category',
        };

        setBook(formattedBook); // Set the book state
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook(); // Trigger fetch
  }, [id]);

  // Handle add to cart action
  const handleAddToCart = () => {
    if (stock > 0 && book) {
      addToCart({ ...book, quantity: 1 }); // Add book to cart
      setStock(prev => prev - 1); // Reduce stock by 1
      alert(`${book.title} added to cart!`);
      navigate('/ShoppingCart'); // Redirect to cart page
    } else {
      alert("Sorry, this book is out of stock.");
    }
  };

  // Show loading message while book data is being fetched
  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details-container">
      {/* Navigation bar at the top */}
      <Navbar />

      {/* Book Details Layout */}
      <div className="book-details">
        {/* Book Image */}
        <div className="book-image">
          <img src={book.image} alt={book.title} />
        </div>

        {/* Book Information */}
        <div className="book-info">
          <h1>{book.title}</h1>
          <h3>Author: {book.author}</h3>
          <h4>Price: LKR {book.price.toFixed(2)}</h4>
          <p><strong>Category:</strong> {book.category}</p>
          <p><strong>Description:</strong> {book.description}</p>

          {/* Stock and Add to Cart Button */}
          <div className="stock-info">
            <p><strong>Stock Availability:</strong> {stock > 0 ? `${stock} items available` : 'Out of Stock'}</p>
            <button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className={stock === 0 ? 'out-of-stock' : 'add-to-cart'}
            >
              {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
