const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Owner = require('../../models/ownerModel');
const Company = require('../../models/companyModel');
const {generateJWTtoken} = require('../../utility/generateJWTtoken');

// registerUser registers any user
// @desc    registerUser :- register owner check company id and company name
// @route   get /api/owner/register
// @access  public

exports.registerUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword , contact, cName, cEmail,cContact,cAddress, cServiceTime } = req.body;
    console.log(req.body)
    console.log("from owner register")
    if (!firstname || !lastname || !email || !password  || !confirmPassword || !contact || !cName || !cEmail || !cContact || !cAddress || !cServiceTime) {
        res.status(400);
        throw new Error('Invalid Credential');
    }
    else if( contact.length > 10 || cContact.length > 10){
        res.status(400);
        throw new Error('Invalid contact');
    }
    else if( password !== confirmPassword){
        res.status(400);
        throw new Error('Invalid password');
    }else if( cServiceTime ){
        // validation is required
    }

    // Check if user already exsist
    const userExists = await Owner.findOne({ $or : [{email:email},{contact:contact}] });
    console.log(userExists);
    if (userExists) {
        res.status(400);
        console.log(userExists);
        throw new Error('Owner is already exists');
    }

    const companyExists = await Company.findOne({ $or:[{email:cEmail},{name:cName},{contact:cContact}] });
    if( companyExists ){
        res.status(400);
        console.log(companyExists);
        throw new Error('compnay is already exists');
    }

    const compnay = await Company.create({
        name : cName,
        email : cEmail,
        contact : cContact,
        address : cAddress,
        serviceTime : cServiceTime,
    })

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const owner = await Owner.create({
        firstname,
        lastname,
        contact,
        email,
        password: hashPassword,
        company_id : compnay._id
    });

    if (owner) {
        res.status(201).json({
            _id: owner._id,
            name: owner.name,
            email: owner.email,
            // is this required
            token:generateJWTtoken(owner._id,"Owner")
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});