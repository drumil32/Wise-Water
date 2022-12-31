const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Customer = require('../../models/customerModel');
const {generateJWTtoken} = require('../../utility/generateJWTtoken');


// registerUser registers any user
// @desc    registerUser :- register customer
// @route   get /api/customer/register
// @access  public

exports.registerUser = asyncHandler(async (req, res) => {
    console.log('we are here bro');
    console.log(req.body);
    const { firstname, email, password, confirmPassword , lastname, address, contact} = req.body;

    if (!firstname || !email || !password || !lastname || !address || !contact) {
        res.status(400);
        throw new Error('Invalid Credential');
    }
    else if( contact.length > 10){
        // res.status(400);
        throw new Error('Invalid contact');
    }
    else if( password !== confirmPassword){
        // res.status(400);
        throw new Error('Invalid password');
    }

    // Check if user already exsist
    const userExists = await Customer.findOne({ email });
    if (userExists) {
        res.status(401);
        console.log(userExists);
        throw new Error('Email is Already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await Customer.create({
        firstname,
        lastname,
        contact,
        address,
        email,
        password: hashPassword
    });
    
    if (user) {
        res.json({
            ...user, 
            // message : 'done',
            // is this required
            // FOR NOW I AM COMMENT THIS BECAUSE IT IS GIVING ERROR LIKE THIS
            token:generateJWTtoken(user._id,"Customer")
        });
    }else{
        res.status(400).send('invalid user data');
        throw new Error('Invalid user data');
    }
});