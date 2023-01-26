const { addressValidation } = require('../shared/addressValidation');
const Company = require('../../models/companyModel');

exports.orderValidation = async (order) => {
    var error = [];

    const { water_type, water_temperature, water_quantity, companyname, address } = order;

    const addressValidationError = addressValidation(address);

    if (!water_type) {
        error.push('water type is required');
    }
    if (!water_temperature) {
        error.push('water temperature is required');
    }
    if (!water_quantity) {
        error.push('water quantity is required');
    }
    if (false) {
        // check whether water_quantity is containing non numeric values
    }
    if (false) {
        // there should be some limit on water_quantity
    }
    if (!companyname) {
        error.push('company name is required');
    }
    if (addressValidationError)
        error = error.concat(addressValidationError);

    if (error.length > 0) {
        return { errorMessage: error, statusCode: 400 };
    }

    try {
        const checkCompany = await Company.findOne({ name: companyname });
        if (null === checkCompany) {
            return { errorMessage: ['company not found'], statusCode: 404 };
        }
    } catch (error) {
        return { errorMessage: ['Interanl Server Error'], statusCode: 500 };
    }

}