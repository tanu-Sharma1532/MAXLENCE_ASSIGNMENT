const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

// controller/authController.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailSender = require('../utils/MailSender'); // adjust path if necessary

exports.register = async (req, res) => {
  try {
    console.log('Body received>', req.body);
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message:'Email and password are required' });
    }
    const hashed = await bcrypt.hash(req.body.password, 10);
    const profile_picture = req.file ? `/uploads/${req.file.filename}` : '';
    console.log('Profile picture>', profile_picture);

    console.log('About to generate token');
    const verification_token = crypto.randomBytes(32).toString('hex');
    console.log('Generated token>', verification_token);

    const user = await User.create({ 
      email: req.body.email, 
      password_hash: hashed, 
      role: req.body.role || 'user',
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      address: req.body.address,
      profile_picture,
      gender: req.body.gender,
      dob: req.body.dob,
      is_verified: false,
      verification_token
    });

    console.log('User created>', user.toJSON());

    const verifyURL = `http://localhost:3001/verify?token=${verification_token}`;

    await mailSender(user.email, "Verify Your Email", 
      `<p>Please click <a href="${verifyURL}">this link</a> to verify your email.</p>`
    );

    res.json({ message:'Registration successful! Please check your email to verify your account.' });

  } catch (err) {
    console.error('Registration failed!', err);
    res.status(500).json({ message:'Registration failed!', error:err.toString() });
  }
};

exports.verify = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ message:'Invalid link!' });
  }
  
  // Look for the user by `verification_token`
  const user = await User.findOne({ where: { verification_token: token } });

  if (!user) {
    return res.status(400).json({ message:'Invalid or already verified!' });
  }
  
  user.is_verified = true;
  user.verification_token = null;
  await user.save();

  res.json({ message:'Email successfully verified!' });
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where:{ email } });
    if (!user) {
      return res.status(400).json({ message:'Invalid credentials'})
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ message:'Invalid credentials'})
    }
    // generate JWT
    const jwt = require("jsonwebtoken");

    const token = jwt.sign({ id:user.id, role:user.role },
      process.env.JWT_SECRET,{ expiresIn:'1h' });

    res.json({ message:'Login successful', token });

  } catch (err) {
    res.status(500).json({ message:'Login failed', error:err });
  }
};

exports.requestReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message:'User not found!' });
    }
  
    const reset_token = crypto.randomBytes(32).toString('hex');
    await User.update({ reset_token }, { where: { id: user.id } });

    const resetURL = `http://localhost:3001/update-password?token=${reset_token}`;

    await mailSender(email, "Reset Your Password",
      `<p>Click <a href="${resetURL}">this link</a> to reset your password.</p>`  
    );

    res.json({ message:'Reset password link has been sent to your email.' });

  } catch (err) {
    res.status(500).json({ message:'Reset failed!', error:err });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({ where: { reset_token: token } });

    if (!user) {
      return res.status(400).json({ message:'Invalid or expired token!' });
    }
  
    const hashed = await bcrypt.hash(password, 10);
    await User.update({ password_hash: hashed, reset_token: null },
      { where: { id: user.id } });

    res.json({ message:'Your password has been reset successfully!' });

  } catch (err) {
    res.status(500).json({ message:'Reset failed!', error:err });
  }
};




