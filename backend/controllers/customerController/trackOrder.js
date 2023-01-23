const orderModel = require("../../models/orderModel")
const workerModel = require("../../models/workerModel")

exports.trackOrder = async(req,res)=>{
const isOrderCorrect = await orderModel.find({$and:[{_id:req.body.order_id},{customer_id:req.userid}]})
console.log("from track order")
console.log(isOrderCorrect[0])
console.log(isOrderCorrect[0].worker_id)
if (isOrderCorrect){
const worker = await workerModel.find({_id: isOrderCorrect[0].worker_id})
console.log(worker)
if(worker){
    res.status(200)
    res.json({
        found:true,
        order:isOrderCorrect,
        worker
    })
}
else{
    res.status(200)
    res.json({
        found:false,
        isOrderCorrect,
    })
}
}else{
    throw Error ("Order Id Not found")
}
}