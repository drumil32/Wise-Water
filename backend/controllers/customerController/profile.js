const Customer = require('../../models/customerModel');
const asyncHandler = require('express-async-handler');

exports.profile = async (req, res) => {

    try {
        const userData = await Customer.findOne({ _id: req.userid });
        if (userData) {
            res.status(200).json({
                userData
            });
        } else {
            res.status(404).json({
                error: {
                    errorMessage: ['user not found']
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }

}