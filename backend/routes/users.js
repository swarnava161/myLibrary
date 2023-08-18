const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Borrowing = require('../models/Borrowing');

// Get user's borrowing history
// router.get('/:userId/borrowing-history', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId).populate('borrowingHistory');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user.borrowingHistory);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// Other user-related routes...

module.exports = router;
