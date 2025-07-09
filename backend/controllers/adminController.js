const User = require('../models/User');

exports.getPendingOwners = async (req, res) => {
  const owners = await User.find({ role: 'owner', isVerified: false });
  res.json(owners);
};

exports.verifyOwner = async (req, res) => {
  const owner = await User.findById(req.params.id);
  if (!owner) return res.status(404).json({ message: 'Owner not found' });
  owner.isVerified = true;
  await owner.save();
  res.json({ message: 'Owner verified' });
};