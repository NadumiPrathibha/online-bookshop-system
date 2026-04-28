const validateBookData = (req, res, next) => {
    const { title, author, price, image, category } = req.body;
  
    // Check if all required fields are provided
    if (!title || !author || !price || !image || !category) {
      return res.status(400).json({ message: 'All fields are required (title, author, price, image, category)' });
    }
  
    // Validate the price (should be a number)
    if (isNaN(price)) {
      return res.status(400).json({ message: 'Price must be a valid number' });
    }
  
    // If everything is valid, proceed to the next middleware (or route handler)
    next();
  };
  
  module.exports = {
    validateBookData,
  };
  