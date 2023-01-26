const { addressValidation } = require('../shared/addressValidation');
const validator = require('validator');
const Company = require('../../models/companyModel');

exports.companyValidation = async (companyData) => {

    const { name, email, contact, serviceTime, address } = companyData;

    const addressValidationError = addressValidation(address);

    var error = [];

    if (addressValidationError) {
        error = error.concat(addressValidationError);
    }
    if (!name) {
        error.push('company name is required');
    }
    if (!email) {
        error.push('company email is required');
    }

    if (email && !validator.isEmail(email)) {
        error.push('email is not a valid');
    }
    if (!contact) {
        error.push('contact is required');
    }
    if (contact && contact.length !== 10) {
        error.push('contact is not valid');
    }
    if (!serviceTime) {
        error.push('service time is required');
    }
    if (serviceTime && false) {
        // validation is required
    }

    if (error.length > 0)
        return error;
    else {
        try {
            const checkCompany = await Company.findOne({ $or: [{ email }, { name }, { contact }] });
            if (checkCompany) {
                return { errorMessage: ['company is alrady exists'], statusCode: 404 };
            }
        } catch (error) {
            return { errorMessage: ['Interanl Server Error'], statusCode: 500 };
        }
    }
}