const express = require('express');
const router = express.Router();

const {workerApplication} = require('../controllers/workerController/application')


router.post('/application',workerApplication);

module.exports = router;