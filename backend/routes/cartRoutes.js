const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// Add to cart
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { productId, title, image, price, quantity } = req.body;

  try {
    // Check if the product already exists in the user's cart
    let cartItem = await CartItem.findOne({ userId, productId });

    if (cartItem) {
      // If it exists, update the quantity
      cartItem.quantity += quantity;
    } else {
      // Otherwise, create a new item
      cartItem = new CartItem({
        userId,
        productId,
        title,
        image,
        price,
        quantity,
      });
    }

    await cartItem.save();  // Save the correct cartItem (updated or new)
    res.status(200).json({ message: 'Item added to cart!', item: cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
});

module.exports = router;
