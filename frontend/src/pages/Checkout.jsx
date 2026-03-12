import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    billing: {
      sameAsShipping: true,
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    payment: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  });

  const cartItems = [
    { id: 1, name: 'Organic Apples', price: 4.99, quantity: 2 },
    { id: 2, name: 'Milk', price: 3.49, quantity: 1 },
    { id: 3, name: 'Eggs', price: 4.99, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (section, field, value) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    // If same as shipping is checked, update billing address
    if (section === 'shipping' && orderData.billing.sameAsShipping) {
      setOrderData(prev => ({
        ...prev,
        billing: {
          ...prev.billing,
          [field]: value
        }
      }));
    }
  };

  const handleSameAsShipping = (checked) => {
    setOrderData(prev => ({
      ...prev,
      billing: {
        ...prev.billing,
        sameAsShipping: checked,
        ...(checked ? prev.shipping : {})
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process order
      console.log('Order submitted:', orderData);
      navigate('/orders');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="checkout-step">
            <h2>Shipping Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={orderData.shipping.firstName}
                  onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={orderData.shipping.lastName}
                  onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={orderData.shipping.email}
                  onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  value={orderData.shipping.phone}
                  onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                value={orderData.shipping.address}
                onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  value={orderData.shipping.city}
                  onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  value={orderData.shipping.state}
                  onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={orderData.shipping.zipCode}
                  onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="checkout-step">
            <h2>Billing Information</h2>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={orderData.billing.sameAsShipping}
                  onChange={(e) => handleSameAsShipping(e.target.checked)}
                />
                Same as shipping address
              </label>
            </div>

            {!orderData.billing.sameAsShipping && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={orderData.billing.firstName}
                      onChange={(e) => handleInputChange('billing', 'firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={orderData.billing.lastName}
                      onChange={(e) => handleInputChange('billing', 'lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={orderData.billing.address}
                    onChange={(e) => handleInputChange('billing', 'address', e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={orderData.billing.city}
                      onChange={(e) => handleInputChange('billing', 'city', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={orderData.billing.state}
                      onChange={(e) => handleInputChange('billing', 'state', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={orderData.billing.zipCode}
                      onChange={(e) => handleInputChange('billing', 'zipCode', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 3:
        return (
          <div className="checkout-step">
            <h2>Payment Information</h2>
            
            <div className="form-group">
              <label>Name on Card</label>
              <input
                type="text"
                className="form-control"
                value={orderData.payment.nameOnCard}
                onChange={(e) => handleInputChange('payment', 'nameOnCard', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 5678 9012 3456"
                value={orderData.payment.cardNumber}
                onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  value={orderData.payment.expiryDate}
                  onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="123"
                  value={orderData.payment.cvv}
                  onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="checkout">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form">
            {/* Progress Steps */}
            <div className="checkout-steps">
              {[1, 2, 3].map(stepNumber => (
                <div key={stepNumber} className={`step ${stepNumber === step ? 'active' : ''} ${stepNumber < step ? 'completed' : ''}`}>
                  <div className="step-number">{stepNumber}</div>
                  <span className="step-label">
                    {stepNumber === 1 && 'Shipping'}
                    {stepNumber === 2 && 'Billing'}
                    {stepNumber === 3 && 'Payment'}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {renderStep()}

              <div className="checkout-actions">
                {step > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setStep(step - 1)}
                  >
                    Previous
                  </button>
                )}
                <button type="submit" className="btn btn-primary">
                  {step === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <span className="item-name">{item.name} × {item.quantity}</span>
                  <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;