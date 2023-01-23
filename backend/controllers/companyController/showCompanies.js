const Company = require('../../models/companyModel');
const asyncHandler = require('express-async-handler');

exports.showCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find({}, { _id: 0 });
    if (companies) {
        res.status(200);
        res.json({
            companies,
        });
    } else {
        res.status(200);
        res.json({
            companies : []
        });
    }
})