import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();

  // Get the logged-in user's email from localStorage
  const loggedInEmail = localStorage.getItem('loggedInUserEmail');

  // Initialize profile state with default values
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    district: '',
    province: '',
    postalCode: '',
  });

  // State to store profile image (as base64)
  const [profileImage, setProfileImage] = useState(null);

  // State to hold order history array
  const [orderHistory, setOrderHistory] = useState([]);

  // Boolean to toggle order history view
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  // Load profile and order history data when component mounts
  useEffect(() => {
    if (!loggedInEmail) return;

    // Load saved profile from localStorage (if exists)
    const savedProfile = localStorage.getItem(`profile_${loggedInEmail}`);
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Set email only if profile does not exist
      setProfile((prev) => ({ ...prev, email: loggedInEmail }));
    }

    // Load saved order history from localStorage (or default to empty array)
    const savedOrders = JSON.parse(localStorage.getItem(`orders_${loggedInEmail}`)) || [];
    setOrderHistory(savedOrders);
  }, [loggedInEmail]);

  // Update profile state when any input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Save profile to localStorage
  const handleSave = () => {
    localStorage.setItem(`profile_${loggedInEmail}`, JSON.stringify(profile));
    alert('Profile updated successfully!');
  };

  // Log the user out and navigate to home
  const handleLogout = () => {
    localStorage.removeItem('loggedInUserEmail');
    alert('You have been logged out');
    navigate('/');
  };

  // Toggle order history visibility
  const toggleOrderHistory = () => {
    setShowOrderHistory(!showOrderHistory);
  };

  // Navigate to the shopping cart page
  const handleGoToCart = () => {
    navigate('/ShoppingCart');
  };

  // Handle profile image selection and convert to base64 for preview
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Show message if user is not logged in
  if (!loggedInEmail) {
    return <h2 style={{ textAlign: 'center' }}>Please log in to view your profile.</h2>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* Header */}
        <div className="form-header">
          <h1>🧑‍💼 My Profile 🧑‍💼</h1>
        </div>

        {/* Profile Form */}
        <form className="profile-form">

          {/* Profile Image Upload */}
          <div className="profile-image">
            <img
              src={profileImage || 'default-image.png'} // show default if none selected
              alt="Profile"
              className="profile-img"
            />
            <input type="file" onChange={handleProfileImageChange} className="profile-img-upload" />
          </div>

          {/* Loop through form fields (except email) */}
          {['name', 'phoneNumber', 'address', 'district', 'province', 'postalCode'].map((field) => (
            <div className="profile-field" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={profile[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}

          {/* Email (readonly) */}
          <div className="profile-field">
            <label>Email</label>
            <input type="email" name="email" value={profile.email} disabled />
          </div>

          {/* Save Changes Button */}
          <div className="save-btn">
            <button type="button" onClick={handleSave}>Save Changes</button>
          </div>
        </form>

        {/* Order History Toggle */}
        <div className="profile-links">
          <button onClick={toggleOrderHistory} className="profile-link-btn">
            {showOrderHistory ? 'Hide Order History' : '📦 View Order History'}
          </button>
        </div>

        {/* Order History Display */}
        {showOrderHistory && (
          <div className="order-history-section">
            <h2>📦 Order History</h2>
            {orderHistory.length === 0 ? (
              <p>No previous orders found.</p>
            ) : (
              <ul className="order-list">
                {orderHistory.map((order, index) => (
                  <li key={index} className="order-item">
                    <p><strong>Order #{index + 1}</strong> - {new Date(order.date).toLocaleString()}</p>
                    <p><strong>Total:</strong> LKR {order.total}</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                      {order.cart?.map((item, idx) => (
                        <li key={idx}>
                          - {item.title} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                    <hr />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Logout Button */}
        <div className="bottom-logout">
          <button onClick={handleLogout} type="button" className="logout-btn">
            Logout
          </button>
        </div>

        {/* Go to Cart Button */}
        <div className="bottom-cart">
          <button onClick={handleGoToCart} type="button" className="cart-btn">
            🛒 Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
