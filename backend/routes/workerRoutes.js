const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {workerApplication} = require('../controllers/workerController/application')
const {profile} = require('../controllers/ownerController/profile');

router.post('/application',workerApplication);
router.get('/profile',protect,profile);

module.exports = router;