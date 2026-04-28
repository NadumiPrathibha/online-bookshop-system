import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { FaShippingFast, FaCreditCard, FaReceipt, FaCheckCircle } from 'react-icons/fa';

function Checkout() {
  const navigate = useNavigate();

  // States for handling cart, shipping, payment, promo, and steps
  const [cart, setCart] = useState([]);
  const [editShipping, setEditShipping] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [step, setStep] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Get the logged-in user's email
  const loggedInEmail = localStorage.getItem('loggedInUserEmail');

  // Shipping info state (pre-filled from user profile if available)
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: loggedInEmail || '',
    phoneNumber: '',
    address: '',
    district: '',
    province: '',
    postalCode: '',
  });

  // Payment method and card info states
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardInfo, setCardInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    setCart(savedCart ? JSON.parse(savedCart) : []);

    if (loggedInEmail) {
      const profileKey = `profile_${loggedInEmail}`;
      const profileData = JSON.parse(localStorage.getItem(profileKey));
      if (profileData) {
        setShippingInfo(prev => ({ ...prev, ...profileData }));
      }

      const savedCard = localStorage.getItem(`card_${loggedInEmail}`);
      if (savedCard) {
        setCardInfo(JSON.parse(savedCard));
        setSaveCard(true);
      }
    }

    // Generate random estimated delivery date (between 3–5 days from now)
    const daysToAdd = Math.floor(Math.random() * 3) + 3;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + daysToAdd);
    setDeliveryDate(estDate.toDateString());
  }, [loggedInEmail]);

  // Handle shipping form input changes
  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // Toggle edit mode for shipping section
  const toggleEditShipping = () => {
    setEditShipping(!editShipping);
  };

  // Handle card input changes
  const handleCardChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  // Calculate total price after discount
  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (total - discount).toFixed(2);
  };

  // Handle final order confirmation
  const handleConfirmOrder = () => {
    setStep(3);
    setIsProcessing(true);

    const orderDetails = {
      shippingInfo,
      paymentMethod,
      cart,
      total: calculateTotal(),
      discount,
      promoCode,
      deliveryDate,
      date: new Date().toISOString(),
      ...(paymentMethod === 'Credit Card' && { cardInfo }),
    };

    // Save card info if selected
    if (paymentMethod === 'Credit Card' && saveCard) {
      localStorage.setItem(`card_${loggedInEmail}`, JSON.stringify(cardInfo));
    }

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem(`orders_${loggedInEmail}`)) || [];
    existingOrders.push(orderDetails);
    localStorage.setItem(`orders_${loggedInEmail}`, JSON.stringify(existingOrders));
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
    localStorage.removeItem('cart');

    // Simulate processing time then navigate to confirmation
    setTimeout(() => {
      navigate('/order-confirmation');
    }, 2000);
  };

  // Apply promo code (e.g., BOOK10 gives 10% off)
  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'BOOK10') {
      const rawTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const discountAmount = rawTotal * 0.1;
      setDiscount(discountAmount);
      alert('Promo code applied! 10% discount added.');
    } else {
      setDiscount(0);
      alert('Invalid promo code.');
    }
  };

  // JSX rendering begins here
  return (
    <div className="checkout-container">
      <h2><FaReceipt /> Checkout</h2>

      {/* Step Progress Indicator */}
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Shipping</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Confirm</div>
      </div>

      {/* Shipping Section */}
      <section className="shipping-section">
        <h3><FaShippingFast /> Shipping Information</h3>
        {editShipping || step === 1 ? (
          <div className="shipping-form">
            {/* Editable Shipping Form */}
            <label>Full Name:
              <input type="text" name="name" value={shippingInfo.name} onChange={handleShippingChange} />
            </label>
            <label>Email:
              <input type="email" name="email" value={shippingInfo.email} disabled />
            </label>
            <label>Phone Number:
              <input type="text" name="phoneNumber" value={shippingInfo.phoneNumber} onChange={handleShippingChange} />
            </label>
            <label>Address:
              <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingChange} />
            </label>
            <label>District:
              <input type="text" name="district" value={shippingInfo.district} onChange={handleShippingChange} />
            </label>
            <label>Province:
              <input type="text" name="province" value={shippingInfo.province} onChange={handleShippingChange} />
            </label>
            <label>Postal Code:
              <input type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleShippingChange} />
            </label>
            <button onClick={() => { toggleEditShipping(); setStep(2); }}>Save & Continue</button>
          </div>
        ) : (
          // Read-only view of shipping details
          <div className="shipping-details">
            <p><strong>Name:</strong> {shippingInfo.name}</p>
            <p><strong>Email:</strong> {shippingInfo.email}</p>
            <p><strong>Phone:</strong> {shippingInfo.phoneNumber}</p>
            <p><strong>Address:</strong> {shippingInfo.address}</p>
            <p><strong>District:</strong> {shippingInfo.district}</p>
            <p><strong>Province:</strong> {shippingInfo.province}</p>
            <p><strong>Postal Code:</strong> {shippingInfo.postalCode}</p>
            <button onClick={() => { toggleEditShipping(); setStep(1); }}>Change</button>
          </div>
        )}
      </section>

      {/* Payment Section */}
      <section className="payment-section">
        <h3><FaCreditCard /> Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => {
            setPaymentMethod(e.target.value);
            setStep(2);
          }}
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>

        {/* Card input fields shown only for Credit Card */}
        {paymentMethod === 'Credit Card' && (
          <div className="card-details">
            <label>Cardholder Name:
              <input type="text" name="cardName" value={cardInfo.cardName} onChange={handleCardChange} required />
            </label>
            <label>Card Number:
              <input type="text" name="cardNumber" value={cardInfo.cardNumber} onChange={handleCardChange} maxLength="16" required />
            </label>
            <label>Expiry Date:
              <input type="text" name="expiryDate" placeholder="MM/YY" value={cardInfo.expiryDate} onChange={handleCardChange} required />
            </label>
            <label>CVV:
              <input type="password" name="cvv" value={cardInfo.cvv} onChange={handleCardChange} maxLength="4" required />
            </label>
            <label>
              <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} />
              Save this card for future purchases
            </label>
          </div>
        )}
      </section>

      {/* Order Summary Section */}
      <section className="summary-section">
        <h3><FaReceipt /> Order Summary</h3>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} className="order-image" />
              <div>
                {item.title} x {item.quantity} - Rs.{item.price * item.quantity}
              </div>
            </li>
          ))}
        </ul>

        {/* Promo Code Section */}
        <div className="promo-code">
          <input
            type="text"
            placeholder="Enter Promo Code (e.g., BOOK10)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button onClick={applyPromo}>Apply</button>
        </div>

        {discount > 0 && <p>🎉 Discount: -Rs.{discount.toFixed(2)}</p>}
        <p><strong>Total: Rs.{calculateTotal()}</strong></p>
        <p>📦 Estimated Delivery: <strong>{deliveryDate}</strong></p>
      </section>

      {/* Confirm Button or Processing Spinner */}
      {isProcessing ? (
        <div className="processing-message">
          <p>🕒 Processing your order, please wait...</p>
          <div className="spinner"></div>
        </div>
      ) : (
        <button className="confirm-btn" onClick={handleConfirmOrder}>
          <FaCheckCircle /> Confirm Order
        </button>
      )}
    </div>
  );
}

export default Checkout;
