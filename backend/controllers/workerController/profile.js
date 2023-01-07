const asyncHandler = require('express-async-handler');
const Company = require('../../models/companyModel');

exports.profile = asyncHandler(async(req,res) =>{
    console.log('came to profile');
    const obj = {email:req.user.email,firstname:req.user.firstname,lastname:req.user.lastname,contact:req.user.contact,company_id:req.user.company_id};
    const company = await Company.findOne({_id:req.user.company_id});

    console.log('profile')
    console.log('came to worker profile');
    console.log(obj);
    console.log(obj);
    res.status(200).json({
        user: obj,
        company : company
    })
})