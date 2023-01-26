const asyncHandler = require('express-async-handler');
const Company = require('../../models/companyModel');
const Worker = require('../../models/workerModel');

exports.profile = asyncHandler(async (req, res) => {
    console.log('came to profile');

    const userData = await Worker.findOne({ _id: req.userid }, { _id: 0, password: 0 });

    const companyData = await Company.findOne({ name: userData.company_name });

    console.log('profile')
    console.log('came to worker profile');
    res.status(200).json({
        userData,
        companyData
    })
})