import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const HotelRoomsPageOwner = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const rooms = location.state || [];
  const navigate = useNavigate();

  const [editingRoomId, setEditingRoomId] = useState(null);
  const [editedRoom, setEditedRoom] = useState({});

  const handleSave = async (roomId) => {
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editedRoom),
      });

      if (response.ok) {
        setEditingRoomId(null);
        // You can update the local rooms array or refetch rooms from the server here
      } else {
        console.error('Failed to update room');
      }
    } catch (err) {
      console.error('Error while updating room:', err);
    }
  };

  return (
    <div className="container py-4">
      <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
      <div>
        <h2>Rooms at {rooms[0]?.hotel?.name || 'Hotel'}</h2>
      </div>

      {rooms.length > 0 ? (
        <div className="row">
          {rooms.map((room) => (
            <div key={room._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{room.roomType}</h5>
                  
                  {editingRoomId === room._id ? (
                    <>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={editedRoom.roomType || room.roomType}
                        onChange={(e) => setEditedRoom({ ...editedRoom, roomType: e.target.value })}
                      />
                      <textarea
                        className="form-control mb-2"
                        value={editedRoom.description || room.description}
                        onChange={(e) => setEditedRoom({ ...editedRoom, description: e.target.value })}
                      />
                      <input
                        type="number"
                        className="form-control mb-2"
                        value={editedRoom.baseFare ?? room.baseFare}
                        onChange={(e) => setEditedRoom({ ...editedRoom, baseFare: parseFloat(e.target.value) })}
                      />
                      <input
                        type="number"
                        className="form-control mb-2"
                        value={editedRoom.capacity ?? room.capacity}
                        onChange={(e) => setEditedRoom({ ...editedRoom, capacity: parseInt(e.target.value) })}
                      />
                      <label className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={editedRoom.isAvailable ?? room.isAvailable}
                          onChange={(e) => setEditedRoom({ ...editedRoom, isAvailable: e.target.checked })}
                        />
                        Available
                      </label>
                      <button className="btn btn-success mb-2" onClick={() => handleSave(room._id)}>Save</button>
                      <button className="btn btn-secondary" onClick={() => setEditingRoomId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p className="card-text">{room.description}</p>
                      <ul className="list-unstyled">
                        <li><strong>Base Fare:</strong> ₹{room.baseFare}</li>
                        <li><strong>Capacity:</strong> {room.capacity} guests</li>
                        <li>
                          <strong>Availability:</strong>{" "}
                          <span className={room.isAvailable ? "text-success" : "text-danger"}>
                            {room.isAvailable ? "Available" : "Not Available"}
                          </span>
                        </li><br />
                        <li>
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => {
                              setEditedRoom(room);
                              setEditingRoomId(room._id);
                            }}
                          >
                            Edit
                          </button>
                        </li>
                      </ul>
                    </>
                  )}
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

export default HotelRoomsPageOwner;