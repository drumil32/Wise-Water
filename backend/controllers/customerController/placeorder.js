const Company = require('../../models/companyModel');
const Order = require('../../models/orderModel');
const asyncHandler = require('express-async-handler');

// placeorder user type : customer
// @desc    placeorder : customer can placeorder by this function
// @route   post /api/customer/placeorder
// @access  private
// applied middleware :- userTypeHandler , protect

exports.placeorder = asyncHandler(async (req,res) =>{
    const {water_type,water_temperature,water_quantity,companyname,address} = req.body.order;
    console.log('this is')
    console.log(req.body.order);
    console.log(address);
    console.log(req.userid);
    if( ''===water_type || ''===water_temperature || ''===water_quantity || ''===companyname ){
        res.status(400);
        throw new Error('please provide all the details');
    }

    const company = await Company.findOne({ name : companyname });
    if( null===company ){
        res.status(400);
        throw new Error('company is not exists');
    }
    console.log(company);
    const order = await Order.create({
        water_type,
        water_temperature,
        water_quantity,
        address,
        company_name : company.name,
        status : 'pending',
        customer_id : req.userid,
    });

    if( order ){
        res.json({
            message : 'from place order'
        });
    }else{
        res.status(400);
        throw new Error('some thing went wrong')
    }
});