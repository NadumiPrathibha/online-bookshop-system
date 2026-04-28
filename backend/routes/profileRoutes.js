const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');  // To access user details, like the email

// Create or update the profile
router.post('/create', async (req, res) => {
  try {
    const { name, phoneNumber, address, district, province, postalCode } = req.body;
    const userId = req.user._id;  // Assuming you have a middleware that attaches user to the request

    // Check if profile exists
    let profile = await Profile.findOne({ userId });
    if (profile) {
      // If profile exists, update it
      profile.name = name;
      profile.phoneNumber = phoneNumber;
      profile.address = address;
      profile.district = district;
      profile.province = province;
      profile.postalCode = postalCode;

      await profile.save();
      return res.status(200).json({ message: 'Profile updated successfully' });
    }

    // If profile doesn't exist, create a new one
    profile = new Profile({
      userId,
      name,
      phoneNumber,
      address,
      district,
      province,
      postalCode
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch user profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
