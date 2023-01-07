const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {workerApplication} = require('../controllers/workerController/application')
const {profile} = require('../controllers/workerController/profile');

router.post('/application',workerApplication);
router.post('/profile',protect,profile);

module.exports = router;