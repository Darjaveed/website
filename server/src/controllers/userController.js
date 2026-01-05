import User from '../models/User.js';

// GET /api/users/me
export const getMe = async (req, res) => {
  try {
    // protect middleware attaches user to req and excludes passwordHash
    const user = req.user;

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return only safe fields
    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/users/me  (update name only)
export const updateMe = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { name: name.trim() },
      { new: true, runValidators: true }
    ).select('name email role createdAt');

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Update me error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
