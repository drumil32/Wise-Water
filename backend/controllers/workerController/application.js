const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const WorkerApplication = require('../../models/workerApplicationModel');
const {passwordGen} = require('../../utility/passwordGenerator');

// registerUser registers any user
// @desc    worker can apply for job to compnay 
// @route   get /api/woker/application
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
    const workerExists = await WorkerApplication.findOne({ email });
    if (workerExists) {
        res.status(400);
        console.log(workerExists);
        throw new Error('Email is Already in use');
    }

    console.log(password);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const worker = await WorkerApplication.create({
        firstname,
        lastname,
        contact,
        email,
        password: hashPassword,
        company_id:company_id
    });

    if (worker) {
        res.status(201).json({
            _id: worker._id,
            name: worker.name,
            email: worker.email,
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});