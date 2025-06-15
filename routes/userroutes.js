const express = require('express');
const router = express.Router();
const { getAllUsers, searchUser, updateUser, getUserById } = require('../controllers/profileController');
const { authenticate } = require('../utils/authenticate');

const multer = require('multer');
const path = require('path');

// Define storage destination and naming
const storage = multer.diskStorage({ 
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

// File filter (optional) to allow only images
function fileFilter (req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image'), false);
  }
}

const upload = multer({ storage, fileFilter });

router.get('/getUserById',authenticate,getUserById);
router.get('/all', authenticate, getAllUsers);
router.get('/search', authenticate, searchUser);
router.post('/update', upload.single('profile_picture'), authenticate, updateUser);

module.exports = router;
