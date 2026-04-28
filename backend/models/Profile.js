const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,  // Stores the URL or path of the image
    default: 'default-profile-image.jpg' // Default image
  }
}, { timestamps: true });

// Create and export the Profile model
module.exports = mongoose.model('Profile', ProfileSchema);
