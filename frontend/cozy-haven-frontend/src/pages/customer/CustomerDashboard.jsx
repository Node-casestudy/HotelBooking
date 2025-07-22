import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/axios';
import { AuthContext } from '../../context/AuthContext';

const CustomerDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'owner') navigate('/owner/dashboard');
    else if (user?.role === 'admin') navigate('/admin/verify-owners');
  }, [user, navigate]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await API.get('/hotels');
        setHotels(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotels();
  }, []);
  const handleViewDetails = async (hotelId) => {
    try {
      const tokenful = localStorage.getItem('cozyUser');
      const parsed = JSON.parse(tokenful);
      const response = await API.get(`/rooms/hotel/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${parsed.token}`,
        },
      });
  
      navigate(`/hotel/${hotelId}/rooms`, { state: response.data });
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
    }
  };

  
  return (
    <div className="row">
        <h3>Welcome to Customer's Dashboard</h3>
      {hotels.map((hotel) => (
        <div className="col-md-4 mb-4" key={hotel._id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{hotel.name}</h5>
              <img src={hotel.images[0]} alt="no image find"  style={{
          width: '100%',
          height: '250px',
          objectFit: 'cover', // Makes the image fill the space nicely
        }}
 />
              <p>{hotel.description}</p>
              <p><strong>Location:</strong> {hotel.location}</p>
              {user ? (
  <Link onClick={() => handleViewDetails(hotel._id)}
  className="btn btn-primary">
    View Details
  </Link>
) : (
  <button
    className="btn btn-secondary"
    onClick={() => navigate("/login")}
  >
    Login to View Details
  </button>
)}            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerDashboard;