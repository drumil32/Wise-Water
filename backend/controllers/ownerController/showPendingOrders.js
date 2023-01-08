const Order = require('../../models/orderModel');
exports.showPendingOrders = async (req,res)=>{
const pendingOrderList = await Order.find({company_name:req.user.company_name})
console.log(pendingOrderList)
if(pendingOrderList){
    res.status(200)
    res.json({
        pendingOrderList:pendingOrderList,
        found:true
    })
}
else{
    res.status(200)
    res.json({
        found:false
    })
}
}