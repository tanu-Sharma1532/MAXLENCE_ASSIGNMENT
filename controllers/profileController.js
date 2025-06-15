const User = require('../models/UserModel');
const { Op } = require('sequelize'); 

exports.getUserById = async (req, res) => {
  try {
    const id = req.id;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password_hash', 'verification_token'] }
    });

    if (!user) {
      return res.status(404).json({ message:'User not found!' });
    }
  
    res.json({ message:'User retrieved successfully!', user });

  } catch (err) {
    res.status(500).json({ message:'Failed to retrieve user!', error:err });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Get page and limit from query, fallback to page = 1, limit = 10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Retrieve total number of users first
    const total = await User.count();

    // Retrieve paginated users
    const users = await User.findAll({ 
      attributes: { exclude: ['password_hash', 'verification_token'] },
      limit,
      offset,
    });

    res.json({ 
      message:'Users retrieved successfully!', 
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });

  } catch (err) {
    res.status(500).json({ message:'Failed to retrieve users!', error:err });
  }
};



exports.searchUser = async (req, res) => {
  try {
    const { query } = req.query; 

    if (!query) {
      return res.status(400).json({ message:'Query is required!' });
    }
  
    const users = await User.findAll({ 
      where: {
        [Op.or]: [
          { email: { [Op.like]: `%${query}%` } },
          { first_name: { [Op.like]: `%${query}%` } },
          { last_name: { [Op.like]: `%${query}%` } }
        ],
      },
      attributes: ['id', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'profile_picture', 'role', 'dob', 'is_verified']
    });

    res.json({ users });

  } catch (err) {
    res.status(500).json({ message:'Search failed!', error:err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.id;
    const { first_name, last_name, phone_number, address, dob } = req.body;
    const profile_picture = req.file ? `/uploads/${req.file.filename}` : undefined;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message:'User not found!' });
    }
  
    // Prepare fields to update
    const updatedData = { first_name, last_name, phone_number, address, dob };
    if (profile_picture) updatedData.profile_picture = profile_picture;

    await user.update(updatedData);

    res.json({ message:'User updated successfully!', user });

  } catch (err) {
    res.status(500).json({ message:'User update failed!', error:err });
  }
};




