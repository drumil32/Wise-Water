const Company = require('../../models/companyModel');
const asyncHandler = require('express-async-handler');

exports.showCompnaies = asyncHandler(async (req,res)=>{
    const {city, pincode} = req.body;
    // if (!city){
    //     throw Error("Error while retriving companies: No search parameter found");
    // }
    // else
    {
        // const cmps = Company.find({address:{city:city, pincode:pincode}});
        const cmps = await Company.find({},{_id:0});
        if (cmps){
            res.status(200);
            res.json({
                companies:cmps,
                found:true,
            });
        }else{
            res.status(200);
            res.json({
                found:false,
            });
        }
    }
})