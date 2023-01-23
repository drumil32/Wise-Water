const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {loginUser, giveUserType} = require('../controllers/userController');

const {showCompanies} = require("../controllers/companyController/showCompanies.js");

router.post('/login',loginUser);
router.get('/show-companies',showCompanies);
router.post('/give-user-type',giveUserType);
module.exports = router;