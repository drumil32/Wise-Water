const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {loginUser, profileUpdate} = require('../controllers/userController');
const {searchByCity} = require("../controllers/companyController/searchCriteria.js")
router.post('/login',loginUser);
router.post('/profileupdate',protect,profileUpdate);
router.post('/searchcompanies',searchByCity);
module.exports = router;