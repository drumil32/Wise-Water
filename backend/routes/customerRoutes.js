const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {registerUser} = require('../controllers/customerController/register');
const {profile} = require('../controllers/customerController/profile');
const {placeorder} = require('../controllers/customerController/placeorder');
const {showPlacedOrders} = require('../controllers/customerController/showPlacedOrders');
const { trackOrder } = require('../controllers/customerController/trackOrder');

router.post('/register',registerUser);
router.get('/profile',protect,profile);
router.post('/placeorder',protect,placeorder);
router.get('/show-placed-orders',protect,showPlacedOrders);
router.get('/authenticate',protect,(req,res)=>{
    console.log('customer in atuhencated')
    res.json({message:'done'});
})
router.post('/track-order',protect,trackOrder)

module.exports = router;