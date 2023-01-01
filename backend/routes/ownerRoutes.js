const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/ownerController/register');
const {profile} = require('../controllers/ownerController/profile');
const {showWorkerApplications} = require('../controllers/ownerController/showWorkerApplications');
const {protect} = require('../middleware/authMiddlerware');

router.post('/register',registerUser);
router.post('/profile',protect,profile);
router.post('/showWorkerApplications',protect,showWorkerApplications);

module.exports = router;