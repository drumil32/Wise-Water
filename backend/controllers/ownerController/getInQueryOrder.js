const expressAsyncHandler = require("express-async-handler");
const workerOrderQuery = require("../../models/workerOrderQuery");

exports.getInQueryOrder = expressAsyncHandler(async (req,res)=>{
const {order_id} = req.body;
const query = await workerOrderQuery.find({order_id:order_id})
console.log("Owner -> getinQueryOrder")
console.log(query);
if(query){
    res.status(200);
    res.json({found:true,query})
}
else{
    throw new Error("Order Id Illegal!");
}
});