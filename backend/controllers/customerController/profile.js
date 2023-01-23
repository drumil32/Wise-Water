const Customer = require('../../models/customerModel');
const asyncHandler = require('express-async-handler');

exports.profile = asyncHandler(async (req, res) => {
    const userData = await Customer.findOne({ _id: req.userid });
    console.log(req.userid)
    console.log(userData);
    console.log('from customer profile')
    if (userData) {
        res.json({
            userData
        });
    }else{
        res.status(401);
        throw new Error('user not found');
    }

})