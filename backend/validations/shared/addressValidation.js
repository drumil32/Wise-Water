exports.addressValidation = (address) => {
    const { line1, line2, city, pincode,state } = address;
    const error = [];
    if (!line1) {
        error.push('address line1 required');
    }
    if (!line2) {
        error.push('address line2 required');
    }
    if (!city) {
        error.push('address city required');
    }
    if (!pincode) {
        error.push('address pincode required');
    }
    if (false) {
        // validte pincode
        // res.status(400);
    }
    if (!state) {
        error.push('address state required');
    }
    if (error.length > 0) {
        return error;
    }
}