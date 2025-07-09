import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OwnerDashboard = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const tokenful = localStorage.getItem('cozyUser');
    const parsed = JSON.parse(tokenful);
    console.log(parsed.token); // again, just the token
    
    fetch('http://localhost:5000/api/hotels/my-hotels', {

      headers: {
        Authorization: `Bearer ${parsed.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error('Error fetching hotels:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Your Hotels</h2>
      <div className="row">
        {hotels.map((hotel) => (
          <div className="col-md-4 mb-4" key={hotel._id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{hotel.name}</h5>
                <img src={hotel.images[0]} alt="" />
                <p className="card-text">{hotel.location}</p>
                <p className="card-text text-muted">{hotel.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerDashboard;