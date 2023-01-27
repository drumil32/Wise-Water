const Company = require('../../models/companyModel');
const asyncHandler = require('express-async-handler');

exports.showCompanies = async (req, res) => {

    try {
        const companies = await Company.find({}, { _id: 0 });
        res.status(200).json({
            companies,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}