const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/ownerController/register');
const {profile} = require('../controllers/ownerController/profile');
const {protect} = require('../middleware/authMiddlerware');

router.post('/register',registerUser);
router.get('/profile',protect,profile);

module.exports = router;