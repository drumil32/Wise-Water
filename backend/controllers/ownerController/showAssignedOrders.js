const Order = require('../../models/orderModel')
exports.showAssignedOrders = async (req,res)=>{
const assignedOrders = await Order.find({company_name:req.user.company_name,status:"assigned"})
if(assignedOrders){
    res.status(200)
    res.json({
        assignedOrders,
        found:true
    })
}
else{
    res.status(201)
    res.json({
        found:false
    })
}
}