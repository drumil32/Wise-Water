const expressAsyncHandler = require("express-async-handler");
const Customer = require('../../models/customerModel');
exports.fetchCustomer = expressAsyncHandler(async (req, res)=>{
    const customer = await Customer.find({_id:req.body.customer_id},{password:0})
    console.log("owner -> show customer")
    console.log(customer)
    if(customer){
        res.status(200);
        res.json({customer:customer[0],found:false});
    }
    else{
        res.json({found:false});
    }
});