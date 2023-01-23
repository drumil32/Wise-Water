const expressAsyncHandler = require("express-async-handler");
const orderModel = require("../../models/orderModel");


exports.getOrder = expressAsyncHandler(async (req,res)=>{
const {order_id} = req.body;
const query = await orderModel.find({_id:order_id})
console.log("Owner -> getinQueryOrder")
console.log(query);
if(query){
    res.status(200);
    res.json({found:true,order:query})
}
else{
    throw new Error("Order Id Illegal!");
}
});