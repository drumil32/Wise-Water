const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {registerUser} = require('../controllers/customerController/register');
const {profile} = require('../controllers/customerController/profile');
const {placeorder} = require('../controllers/customerController/placeorder');
const {showPlacedOrders} = require('../controllers/customerController/showPlacedOrders');
router.post('/register',registerUser);
router.post('/profile',protect,profile);
router.post('/placeorder',protect,placeorder);
router.post('/show-placed-orders',protect,showPlacedOrders);

module.exports = router;