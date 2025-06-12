const Users = require('../models/initData/schema/Users');
const MobileNumbers = require("../models/initData/schema/MobileNumbers")

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.body; 

  if (!email) {
    return res.status(400).json({ error: 'Email parameter is required.' });
  }

  try {
    const user = await Users.findOne({
      where: { email },
      include: [
        {
          model: MobileNumbers,
          as: 'mobileNumbers',
          attributes: ['mobile_number'],
        },
      ],
    });

    if (user) {
      const response = {
        name: user.name,
        email: user.email,
        mobile_numbers: user.mobileNumbers.map(m => m.mobile_number), // Handle multiple numbers
        hostel_name: user.hostel_name,
        room_number: user.room_number,
      };
      return res.status(200).json(response);
    }

    return res.status(404).json({ error: 'User not found' });
  } catch (error) {
    console.error('Error fetching user by email:', error.message);
    return res.status(500).json({ error: 'An internal error occurred.' });
  }
};


const createUser = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);

    const userMobileNum = await MobileNumbers.create({
      user_id: parseInt(newUser.user_id),      
      mobile_number: req.body.mobile_num
    });

    res.status(201).json({
      user: newUser,
      mobileNumber: userMobileNum,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (user) {
      await user.update(req.body);
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
};
