import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnerNavbar from '../components/OwnerNavbar';
import axios from 'axios';

const OwnerDashboard = () => {
  const [activeCard, setActiveCard] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    amenities: [],
    isActive: true,
  });
  
  const renderCardContent = () => {
    const [hotels, setHotels] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
      const tokenful = localStorage.getItem('cozyUser');
      const parsed = JSON.parse(tokenful);
      // console.log(parsed.token); // again, just the token
      
      fetch('http://localhost:5000/api/hotels/my-hotels', {
  
        headers: {
          Authorization: `Bearer ${parsed.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setHotels(data))
        .catch((err) => console.error('Error fetching hotels:', err));
    }, []);


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const body = new FormData();
    
      // Attach basic form data
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach(item => body.append(`${key}[]`, item));
        } else {
          body.append(key, formData[key]);
        }
      }
    
      // Attach image files
      images.forEach((img) => {
        body.append('images', img);
      });
    
      const tokenful = localStorage.getItem('cozyUser');
      const parsed = JSON.parse(tokenful);
      const ownerId = parsed.user._id
      // Attach owner ID from AuthContext (assuming it's available)
      body.append('owner', ownerId);
    
      try {
        const tokenful = localStorage.getItem('cozyUser');
        const parsed = JSON.parse(tokenful);
        const response = await axios.post('http://localhost:5000/api/hotels/add', body, {
          headers: { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${parsed.token}`},
         
        });
        console.log('Hotel Added:', response.data);
        alert('Hotel successfully created!');
      } catch (error) {
        console.error('Error adding hotel:', error);
        alert('Oops! Something went wrong.');
      }
    };

    const handleAmenitiesChange = (e) => {
      const values = e.target.value.split(',').map(val => val.trim());
      setFormData((prev) => ({ ...prev, amenities: values }));
    };

const handleImageUpload = (e) => {
  const selectedFiles = Array.from(e.target.files);
  setImages(selectedFiles);
};

    switch (activeCard) {
      case 'profile':
        return <p>Name: Alice Johnson<br />Email: alice.owner@example.com</p>;
      case 'hotels':
        return (
          <>
            <h2 className="mb-4 text-center">Your Hotels</h2>
            <div className="row">
              {hotels.map((hotel) => (
                <div className="col-md-4 mb-4" key={hotel._id}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">{hotel.name}</h5>
                      <img src={hotel.images[0]} alt="" className="img-fluid" />
                      <p className="card-text">{hotel.location}</p>
                      <p className="card-text text-muted">{hotel.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case 'addhotel':
        return  (
          <>
          <h2>Add a New Hotel</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input name="name" onChange={handleChange} className="form-control mb-2" placeholder="Hotel Name" required />
          <textarea name="description" onChange={handleChange} className="form-control mb-2" placeholder="Description" />
          <input name="location" onChange={handleChange} className="form-control mb-2" placeholder="Location" required />
          <input name="address" onChange={handleChange} className="form-control mb-2" placeholder="Address" />
          <input name="contactEmail" type="email" onChange={handleChange} className="form-control mb-2" placeholder="Contact Email" />
          <input name="contactPhone" onChange={handleChange} className="form-control mb-2" placeholder="Contact Phone" />
          <input type="text" onChange={handleAmenitiesChange} className="form-control mb-2" placeholder="Amenities (comma-separated)" />
          <input type="file" multiple onChange={handleImageUpload} className="form-control mb-2" />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
        );

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
          className={`btn btn-outline-warning mx-2 ${activeCard === 'addhotel' ? 'active' : ''}`}
          onClick={() => setActiveCard('addhotel')}
        >
          Add Hotel
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

export default OwnerDashboard;