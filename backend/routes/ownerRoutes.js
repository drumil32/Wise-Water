const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/ownerController/register');
const {profile} = require('../controllers/ownerController/profile');
const {showWorkerApplications} = require('../controllers/ownerController/showWorkerApplications');
const {protect} = require('../middleware/authMiddlerware');

router.post('/register',registerUser);
router.get('/profile',protect,profile);
router.get('/showWorkerApplications',showWorkerApplications);

module.exports = router;