const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Customer = require('../../models/customerModel');
const { generateJWTtoken } = require('../../utility/generateJWTtoken');
const { customerValidation } = require('../../validations/customerValidation/customerValidation');

// registerUser registers any user
// @desc    registerUser :- register customer
// @route   get /api/customer/register
// @access  public

exports.registerUser = async (req, res) => {
    
    const error = await customerValidation(req.body);
    
    if (error && error.errorMessage.length > 0) {
        res.status(error.statusCode).json({
            error: {
                errorMessage: error.errorMessage
            }
        });
    } else {
        try {
            const { firstname, email, password, lastname, address, contact } = req.body;
            const user = await Customer.create({
                firstname,
                lastname,
                contact,
                address,
                email,
                password: await bcrypt.hash(password, 10)
            });

            res.status(200).json({
                token: generateJWTtoken(user._id, "Customer"),
                type: 'data'
            });
        } catch (error) {
            res.status(500).json({
                error: {
                    errorMessage: ['Interanl Server Error']
                }
            })
        }
    }
};

