import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const HotelRoomsPage = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const rooms = location.state || [];
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <div>
        {/* <h1>Welcome to the {hotelId}</h1> */}
        <h2>Welcome to Hotel Rooms for Customer</h2>
        <h2>Rooms at {rooms[0]?.hotel?.name || 'Hotel'}</h2>
      </div>
      {rooms.length > 0 ? (
        <div className="row">
          {rooms.map((room) => (
            <div key={room._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{room.roomType}</h5>
                  <p className="card-text">{room.description}</p>
                  <ul className="list-unstyled">
                    <li><strong>Base Fare:</strong> ₹{room.baseFare}</li>
                    <li><strong>Capacity:</strong> {room.capacity} guests</li>
                    <li>
                      <strong>Availability:</strong>{" "}
                      <span className={room.isAvailable ? "text-success" : "text-danger"}>
                        {room.isAvailable ? "Available" : "Not Available"}
                      </span>
                    </li>
                  </ul>
                  <button className="btn btn-outline-primary mt-auto" onClick={navigate('/booking')}>
                    Book Room
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No rooms found for this hotel.</p>
      )}
    </div>
  );
};

export default HotelRoomsPage;