import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OwnerDashboardCards = () => {
  const [activeCard, setActiveCard] = useState('profile');

  const renderCardContent = () => {
    switch (activeCard) {
      case 'profile':
        return <p>Name: Alice Johnson<br />Email: alice.owner@example.com</p>;
      case 'hotels':
        return <p>You own 3 hotels in Mumbai and Delhi.<br />Check your bookings below.</p>;
      case 'reports':
        return <p>Monthly revenue: ₹75,000<br />Occupancy rate: 82%</p>;
      default:
        return null;
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Owner Dashboard</h2>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-outline-primary mx-2 ${activeCard === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveCard('profile')}
        >
          Profile
        </button>
        <button
          className={`btn btn-outline-success mx-2 ${activeCard === 'hotels' ? 'active' : ''}`}
          onClick={() => setActiveCard('hotels')}
        >
          Hotels
        </button>
        <button
          className={`btn btn-outline-warning mx-2 ${activeCard === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveCard('reports')}
        >
          Reports
        </button>
      </div>

      {/* Active Card */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-capitalize">{activeCard}</h5>
          {renderCardContent()}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardCards;