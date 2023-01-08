const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const WorkerApplication = require('../../models/workerApplicationModel');
const Company = require('../../models/companyModel');

// registerUser registers any user
// @desc    worker can apply for job to company 
// @route   get /api/woker/application
// @access  public

exports.workerApplication = asyncHandler(async (req, res) => {
    const { firstname, email, lastname, contact, companyname } = req.body;

    if (!firstname || !email || !lastname || !contact || !companyname) {
        res.status(400);
        throw new Error('Invalid Credential');
    }
    else if (contact.length > 10) {
        res.status(400);
        throw new Error('Invalid contact');
    }

    const company = await Company.findOne({ name: companyname });
    console.log(company);
    if (null === company) {
        res.status(401);
        throw new Error('company is not exists');
    }

    // Check if user already exsist

    const workerExists = await WorkerApplication.findOne({ $or: [{ email, company_name: companyname }, { contact: contact, company_name: companyname }] });
    if (workerExists) {
        res.status(400);
        console.log(workerExists);
        throw new Error(`You already applied for ${companyname}`);
    }

    const worker = await WorkerApplication.create({
        firstname,
        lastname,
        contact,
        email,
        company_name: companyname
    });

    if (worker) {
        res.status(201).json({
            _id: worker._id,
            name: worker.name,
            email: worker.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});