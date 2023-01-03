const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {loginUser, profileUpdate} = require('../controllers/userController');
const {showCompanies} = require("../controllers/companyController/showCompanies.js");

router.post('/login',loginUser);
router.post('/profileupdate',protect,profileUpdate);
router.get('/showCompanies',showCompanies);
module.exports = router;