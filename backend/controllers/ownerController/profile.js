const asyncHandler = require('express-async-handler');
const Owner = require('../../models/ownerModel');
const Company = require('../../models/companyModel');

exports.profile = asyncHandler(async (req, res) => {
    console.log('came to profile');
    // const obj = {email:req.user.email,firstname:req.user.firstname,lastname:req.user.lastname,contact:req.user.contact,company_name:req.user.company_name};
    console.log(req.userid)
    const userData = await Owner.findOne({ _id: req.userid },{password:0});
    console.log(userData);
    if (userData) {

        const companyData = await Company.findOne({ name: userData.company_name });

        if (companyData) {

            console.log('profile')
            console.log('came to owner profile');
            // console.log(req.user);
            // console.log(obj);
            console.log(companyData);
            res.status(200).json({
                userData,
                companyData
            })
        } else {

            res.status(401);
            throw new Error('company not found');
        }
    } else {
        res.status(401);
        throw new Error('user not found');
    }
})