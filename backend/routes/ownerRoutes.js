const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/ownerController/register');
router.post('/register',registerUser);

module.exports = router;