const Hotel = require('../models/Hotel');

exports.addHotel = async (req, res) => {
  try {
    const { name, description, location, address, contactEmail, contactPhone, amenities } = req.body;

    const imageUrls = req.files?.map(file => 
      `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
    ) || [];

    const hotel = await Hotel.create({
      name,
      description,
      location,
      address,
      contactEmail,
      contactPhone,
      amenities: amenities ? amenities.split(',') : [],
      images: imageUrls,
      owner: req.user.id
    });

    res.status(201).json(hotel);
  } catch (err) {
    console.error('Error adding hotel:', err);
    res.status(500).json({ message: 'Server error while adding hotel' });
  }
};


exports.getHotels = async (req, res) => {
  const hotels = await Hotel.find().populate('owner', 'name email');
  res.json(hotels);
};

exports.getHotelById = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
};

exports.getHotelsByOwner = async (req, res) => {
  try {
    const hotels = await Hotel.find({ owner: req.params.ownerId });
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels by owner:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get hotels for the logged-in hotel owner
exports.getMyHotels = async (req, res) => {
  console.log("Inside getMyHotels for user", req.user._id); // ✅ Log here
  try {
    const hotels = await Hotel.find({ owner: req.user._id });
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels for owner:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


