const asyncHandler = require('express-async-handler');
const Owner = require('../../models/ownerModel');
const Company = require('../../models/companyModel');

exports.profile = asyncHandler(async(req,res) =>{
    console.log('came to profile');
    const obj = {email:req.user.email,firstname:req.user.firstname,lastname:req.user.lastname,contact:req.user.contact,company_id:req.user.company_id};
    const company = await Company.findOne({_id:req.user.company_id});

    // console.log(company);
    
    // console.log(company);
    // obj.companyName = company.name;
    // console.log(req.cName)
    // console.log(company.name)
    // obj.companyEmail = company.email;
    // obj.companyContact = company.contact;
    // obj.companyAddress = company.address;
    // obj.companyRating = company.rating;
    // obj.companyServiceTime = company.serviceTime;
    console.log('profile')
    console.log('came to owner profile');
    console.log(obj);
    res.status(200).json({
        user: obj,
        company : company
    })
})