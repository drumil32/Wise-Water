const Order = require('../../models/orderModel');
const Owner = require('../../models/ownerModel');

exports.showAssignedOrders = async (req, res) => {
    const {company_name} = await Owner.findOne({ _id: req.userid }, { company_name: 1,_id:0 });
    console.log(company_name);
    const assignedOrders = await Order.find({ company_name, status: "assigned" })
    if (assignedOrders) {
        res.status(200)
        res.json({
            assignedOrders,
            found: true
        })
    }
    else {
        res.status(201)
        res.json({
            found: false
        })
    }
}