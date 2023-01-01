const asyncHandler = require('express-async-handler');
const Owner = require('../../models/ownerModel');
const Company = require('../../models/companyModel');

exports.profile = asyncHandler(async(req,res) =>{
    const obj = {email:req.user.email,firstname:req.user.firstname,lastname:req.user.lastname,contact:req.user.contact,company_id:req.user.company_id};
    const compnay = await Company.findOne({_id:req.user.company_id});
    // console.log(compnay);
    obj.cName = compnay.name;
    // console.log(req.cName)
    // console.log(compnay.name)
    obj.cEmail = compnay.email;
    obj.cContact = compnay.contact
    obj.cAddress = compnay.address
    obj.cRating = compnay.rating
    obj.cServiceTime = compnay.serviceTime;
    console.log('profile')
    console.log(obj);
    res.status(200).json({
        user: obj
    })
})