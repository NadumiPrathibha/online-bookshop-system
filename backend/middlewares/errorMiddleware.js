const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack); // Log the error details (in development, you can use a logger library)

  const statusCode = err.statusCode || 500; // Default to 500 (Internal Server Error)
  const message = err.message || 'Something went wrong!';

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;
