const Company = require('../../models/companyModel');
const asyncHandler = require('express-async-handler');

exports.showCompanies = asyncHandler(async (req, res) => {
    const cmps = await Company.find({}, { _id: 0 });
    if (cmps) {
        res.status(200);
        res.json({
            companies: cmps,
            found: true,
        });
    } else {
        res.status(200);
        res.json({
            found: false,
        });
    }
})