const { userValidation } = require('../shared/userValidation');
const {companyValidation} = require('../companyValidation/companyValidation');
const Owner = require('../../models/ownerModel');

exports.ownerValidation = async (obj) => {
    const { userData: ownerData, companyData } = obj;

    const userValidationError = userValidation(ownerData);
    const companyValidationError = await companyValidation(companyData);

    var error = [];

    if (userValidationError || companyValidationError) {

        if (userValidationError) {
            error = error.concat(userValidationError);
        }

        if (companyValidationError) {
            error = error.concat(companyValidationError);
        }

        return { errorMessage: error, statusCode: 400 };
    } else {
        const { email, contact } = ownerData;
        try {
            // Check if user already exsist
            const checkUser = await Owner.findOne({ $or: [{ email }, { contact }] });
            if (checkUser) {
                return { errorMessage: ['You are alerady signed up'], statusCode: 404 };
            }
        } catch (error) {
            return { errorMessage: ['Interanl Server Error'], statusCode: 500 };
        }
    }
}