const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Owner = require('../../models/ownerModel');
const Company = require('../../models/companyModel');
const { generateJWTtoken } = require('../../utility/generateJWTtoken');

// registerUser registers any user
// @desc    registerUser :- register owner check company id and company name
// @route   get /api/owner/register
// @access  public

exports.registerUser = asyncHandler(async (req, res) => {
    const { userData, companyData } = req.body;

    checkValidation(userData, companyData, res);

    // // Check if user already exsist
    const userExists = await Owner.findOne({ $or: [{ email: userData.email }, { contact: userData.contact }] });
    console.log(userExists);
    if (userExists) {
        res.status(400);
        console.log(userExists);
        throw new Error('Owner is already exists');
    }

    const companyExists = await Company.findOne({ $or: [{ email: companyData.email }, { name: companyData.name }, { contact: companyData.contact }] });
    if (companyExists) {
        res.status(400);
        console.log(companyExists);
        throw new Error('company is already exists');
    }

    const company = await Company.create({
        name: companyData.name,
        email: companyData.email,
        contact: companyData.contact,
        address: companyData.address,
        serviceTime: companyData.serviceTime,
    })

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);

    const owner = await Owner.create({
        firstname: userData.firstname,
        lastname: userData.lastname,
        contact: userData.contact,
        email: userData.email,
        password: hashPassword,
        company_name: companyData.name
    });

    if (owner) {
        res.status(201).json({
            token: generateJWTtoken(owner._id, "Owner"),
            type : 'data'
        });
    } else {
        res.status(400);
        throw new Error('some thing went wrong please try again');
    }
});


function checkValidation(userData, companyData, res) {


    const { firstname, lastname, email, password, confirmPassword, contact, } = userData;

    const { name: companyName, email: companyEmail, contact: companyContact, serviceTime: companyServiceTime, address: companyAddress } = companyData;

    if (!firstname || !lastname || !email || !password || !confirmPassword || !contact || !companyName || !companyEmail || !companyContact || !companyServiceTime || !companyAddress.line1 || !companyAddress.line2 || !companyAddress.city || !companyAddress.pincode || !companyAddress.state) {
        res.status(400);
        throw new Error('please provide all the details');
    }
    else if (contact.length !== 10 || companyContact.length !== 10) {
        res.status(400);
        throw new Error('contact length must be 10');
    }
    else if (password !== confirmPassword) {
        res.status(400);
        throw new Error('password and confirm password must be the same');
    } else if (companyServiceTime) {
        // validation is required
    } else if (companyAddress) {
        // validation is required
        // for pincode
    }
}