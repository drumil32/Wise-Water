const expressAsyncHandler = require("express-async-handler")
const workerOrderQuery = require("../../models/workerOrderQuery")

exports.inQueryOrder = expressAsyncHandler(async(req,res)=>{
    const inQueryOrders = await workerOrderQuery.find({});
    console.log("Owner->in order query");
    console.log(inQueryOrders);
    if(inQueryOrders){
        res.status(200);
        res.json({inQueryOrders,found:true});
    }
    else{
        res.status(201)
        res.json({
            found:false
        })
    }
})