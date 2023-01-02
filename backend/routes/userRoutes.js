const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {loginUser, profileUpdate} = require('../controllers/userController');
const {showCompnaies} = require("../controllers/companyController/showCompnaies.js");

router.post('/login',loginUser);
router.post('/profileupdate',protect,profileUpdate);
router.get('/showCompanies',showCompnaies);
module.exports = router;