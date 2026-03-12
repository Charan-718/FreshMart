import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 45.99,
      items: [
        { name: 'Organic Apples', quantity: 2, price: 4.99 },
        { name: 'Milk', quantity: 1, price: 3.49 },
        { name: 'Eggs', quantity: 1, price: 4.99 }
      ],
      tracking: {
        shipped: '2024-01-16',
        delivered: '2024-01-18'
      }
    },
    {
      id: 'ORD-002',
      date: '2024-01-20',
      status: 'shipped',
      total: 32.50,
      items: [
        { name: 'Chicken Breast', quantity: 1, price: 8.99 },
        { name: 'Carrots', quantity: 1, price: 2.49 }
      ],
      tracking: {
        shipped: '2024-01-21',
        estimated: '2024-01-23'
      }
    },
    {
      id: 'ORD-003',
      date: '2024-01-25',
      status: 'processing',
      total: 28.75,
      items: [
        { name: 'Bread', quantity: 1, price: 2.99 },
        { name: 'Bananas', quantity: 1, price: 1.99 }
      ]
    }
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const getStatusBadge = (status) => {
    const statusConfig = {
      processing: { class: 'status-processing', text: 'Processing' },
      shipped: { class: 'status-shipped', text: 'Shipped' },
      delivered: { class: 'status-delivered', text: 'Delivered' },
      cancelled: { class: 'status-cancelled', text: 'Cancelled' }
    };
    
    const config = statusConfig[status] || { class: 'status-default', text: status };
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  const getTrackingInfo = (order) => {
    switch (order.status) {
      case 'delivered':
        return `Delivered on ${new Date(order.tracking.delivered).toLocaleDateString()}`;
      case 'shipped':
        return `Shipped on ${new Date(order.tracking.shipped).toLocaleDateString()} • Estimated delivery: ${new Date(order.tracking.estimated).toLocaleDateString()}`;
      case 'processing':
        return 'Your order is being processed';
      default:
        return 'Tracking information not available';
    }
  };

  return (
    <div className="orders">
      <div className="container">
        <h1>My Orders</h1>
        
        {/* Order Tabs */}
        <div className="orders-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Orders
          </button>
          <button 
            className={`tab-btn ${activeTab === 'processing' ? 'active' : ''}`}
            onClick={() => setActiveTab('processing')}
          >
            Processing
          </button>
          <button 
            className={`tab-btn ${activeTab === 'shipped' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipped')}
          >
            Shipped
          </button>
          <button 
            className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
            onClick={() => setActiveTab('delivered')}
          >
            Delivered
          </button>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <div className="no-orders">
              <h3>No orders found</h3>
              <p>You don't have any {activeTab !== 'all' ? activeTab : ''} orders yet.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="order-status">
                    {getStatusBadge(order.status)}
                    <p className="order-total">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="order-tracking">
                  <p>{getTrackingInfo(order)}</p>
                </div>

                <div className="order-items">
                  <h4>Items:</h4>
                  <div className="items-list">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                        <span className="item-price">${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-actions">
                  <button className="btn btn-secondary">View Details</button>
                  {order.status === 'delivered' && (
                    <button className="btn btn-primary">Reorder</button>
                  )}
                  {order.status === 'processing' && (
                    <button className="btn btn-danger">Cancel Order</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;