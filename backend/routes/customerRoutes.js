const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {registerUser} = require('../controllers/customerController/register');
const {profile} = require('../controllers/customerController/profile');
const {placeorder} = require('../controllers/customerController/placeorder');
router.post('/register',registerUser);
router.post('/profile',protect,profile);
router.post('/placeorder',protect,placeorder);

module.exports = router;