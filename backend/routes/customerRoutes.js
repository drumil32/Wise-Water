const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {registerUser} = require('../controllers/customerController/register');
const {profile} = require('../controllers/customerController/profile');
router.post('/register',registerUser);
router.post('/profile',protect,profile);

module.exports = router;