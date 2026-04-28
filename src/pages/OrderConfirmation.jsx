import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';
import html2pdf from 'html2pdf.js';

function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const invoiceRef = useRef();

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const downloadInvoice = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0.5,
      filename: `Invoice_${order?.shippingInfo?.name || 'Customer'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(options).from(element).save();
  };

  if (!order) {
    return <div className="confirmation-container">Loading order details...</div>;
  }

  const { shippingInfo, paymentMethod, cardInfo, cart, total, discount, promoCode, deliveryDate, date } = order;

  return (
    <div className="confirmation-container">
      <h2>✅ Order Confirmed</h2>
      <p>Thank you for your purchase, <strong>{shippingInfo?.name || 'Customer'}</strong>!</p>

      <div className="invoice-box" ref={invoiceRef}>
        <h3>📦 Shipping Info</h3>
        <p><strong>Name:</strong> {shippingInfo.name}</p>
        <p><strong>Email:</strong> {shippingInfo.email}</p>
        <p><strong>Phone:</strong> {shippingInfo.phoneNumber}</p>
        <p><strong>Address:</strong> {shippingInfo.address}</p>
        <p><strong>District:</strong> {shippingInfo.district}</p>
        <p><strong>Province:</strong> {shippingInfo.province}</p>
        <p><strong>Postal Code:</strong> {shippingInfo.postalCode}</p>

        <h3>💳 Payment Method</h3>
        <p>{paymentMethod}</p>
        {paymentMethod === 'Credit Card' && cardInfo && (
          <>
            <p><strong>Cardholder:</strong> {cardInfo.cardName}</p>
            <p><strong>Card Number:</strong> **** **** **** {cardInfo.cardNumber.slice(-4)}</p>
          </>
        )}

        <h3>🧾 Order Summary</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.title} x {item.quantity} - Rs.{item.price * item.quantity}
            </li>
          ))}
        </ul>
        {discount > 0 && (
          <p><strong>Discount ({promoCode}):</strong> -Rs.{discount.toFixed(2)}</p>
        )}
        <p><strong>Total:</strong> Rs.{total}</p>
        <p><strong>Estimated Delivery:</strong> {deliveryDate}</p>
        <p><strong>Order Date:</strong> {date}</p>
      </div>

      <div className="buttons-group">
        <button className="back-home-btn" onClick={() => navigate('/Profile')}>🏠 Back to Profile</button>
        <button className="download-btn" onClick={downloadInvoice}>⬇️ Download Invoice</button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
