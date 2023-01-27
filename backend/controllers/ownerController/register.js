const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Owner = require('../../models/ownerModel');
const Company = require('../../models/companyModel');
const { generateJWTtoken } = require('../../utility/generateJWTtoken');
const {ownerValidation} = require('../../validations/ownerValidation/ownerValidation');

// registerUser registers any user
// @desc    registerUser :- register owner check company id and company name
// @route   get /api/owner/register
// @access  public

exports.registerUser = async (req, res) => {

    const error = await ownerValidation(req.body);

    if (error && error.errorMessage.length > 0) {
        res.status(error.statusCode).json({
            error: {
                errorMessage: error.errorMessage
            }
        });
    } else {
        const { userData, companyData } = req.body;
        try {
            const company = await Company.create({
                name: companyData.name,
                email: companyData.email,
                contact: companyData.contact,
                address: companyData.address,
                serviceTime: companyData.serviceTime,
            });

            const owner = await Owner.create({
                firstname: userData.firstname,
                lastname: userData.lastname,
                contact: userData.contact,
                email: userData.email,
                password: await bcrypt.hash(userData.password, 10),
                company_name: companyData.name
            });

            res.status(201).json({
                token: generateJWTtoken(owner._id, "Owner"),
                type: 'data'
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
};