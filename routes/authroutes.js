const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController");

const multer = require('multer');
const path = require('path');
const { authenticate } = require('../utils/authenticate');

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

router.post('/register', upload.single('profile_picture'), authController.register);
router.post('/login', authController.login);
router.post('/request-reset',authenticate, authController.requestReset);
router.post('/reset-password',authenticate, authController.resetPassword);
router.get('/verify',authController.verify);

module.exports = router;