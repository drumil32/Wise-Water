const expressAsyncHandler = require("express-async-handler");
const orderModel = require("../../models/orderModel");
const workerOrderQuery = require("../../models/workerOrderQuery");

exports.reAssignOrder = expressAsyncHandler(async (req,res)=>{
const {order_id} = req.body;
const order = await orderModel.find({_id:order_id})
console.log("Owner -> getinQueryOrder")
console.log(order);
if(order){
    const update = await orderModel.updateOne({_id:order_id},{$set:{status:"assigned"}})
    const deleted = await workerOrderQuery.deleteOne({order_id:order_id})
    if( update && deleted ){
        res.status(200);
        res.json({success:true})
    }
    else{
        throw new Error("Error updating Status of Order");
    }
}
else{
    throw new Error("Order Id Illegal!");
}
});