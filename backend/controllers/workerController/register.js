const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Worker = require('../models/workerModel');
const {passwordGen} = require('../utility/passwordGenerator');
const {generateJWTtoken} = require('../utility/generateJWTtoken');

// registerUser registers any user
// @desc    register worker check company_id
// @route   get /api/worker/register
// @access  public

exports.workerApplication = asyncHandler(async (req, res) => {
    const { firstname, email, lastname, contact, company_id} = req.body;

    const password = passwordGen(8);

    if (!firstname || !email || !lastname || !contact || !company_id) {
        res.status(400);
        throw new Error('Invalid Credential');
    }
    else if( contact.length > 10){
        res.status(400);
        throw new Error('Invalid contact');
    }
    // Check if user already exsist
    
    const workerExists = await Worker.findOne({ $or : [{email:email},{contact:contact}] });
    if (workerExists) {
        res.status(400);
        console.log(workerExists);
        throw new Error('Email is Already in use');
    }

    console.log(password);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const worker = await Worker.create({
        firstname,
        lastname,
        contact,
        email,
        password: hashPassword,
        company_id:company_id
    });

    if (worker) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // is this required
            token:generateJWTtoken(user._id,"Worker")
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});