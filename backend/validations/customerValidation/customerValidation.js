const { userValidation } = require('../shared/userValidation');
const { addressValidation } = require('../shared/addressValidation');
const Customer = require('../../models/customerModel');

exports.customerValidation = async (customer) => {

    const userValidationError = userValidation(customer);
    const addressValidationError = addressValidation(customer.address);

    var error = [];

    if (userValidationError || addressValidationError) {

        if (userValidationError) {
            error = error.concat(userValidationError);
        }

        if (addressValidationError)
            error = error.concat(addressValidationError);

        return { errorMessage: error, statusCode: 400 };
    } else {
        const { email, contact } = customer;
        // Check if user already exsist
        try {
            const checkUser = await Customer.findOne({ $or: [{ email: email }, { contact: contact }] });
            if (checkUser) {
                return { errorMessage: ['You are alerady signed up'], statusCode: 404 };
            }
        } catch (error) {
            return { errorMessage: ['Interanl Server Error'], statusCode: 500 };
        }
    }
}