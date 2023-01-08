const asyncHandler = require('express-async-handler');
const Owner = require('../../models/ownerModel');
const Company = require('../../models/companyModel');

exports.profile = asyncHandler(async(req,res) =>{
    console.log('came to profile');
    // const obj = {email:req.user.email,firstname:req.user.firstname,lastname:req.user.lastname,contact:req.user.contact,company_name:req.user.company_name};
    console.log(req.user.company_name)
    const company = await Company.findOne({name:req.user.company_name});

    console.log('profile')
    console.log('came to owner profile');
    // console.log(req.user);
    // console.log(obj);
    console.log(company);
    res.status(200).json({
        user: req.user,
        company : company
    })
})