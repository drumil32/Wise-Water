const Customer = require('../../models/customerModel');
const asyncHandler = require('express-async-handler');

exports.profile = asyncHandler(async (req, res) => {
    const userData = await Customer.findOne({ _id: req.userid });

    if (userData) {
        res.status(200).json({
            userData
        });
    } else {
        res.status(401);
        throw new Error('user not found');
    }

})