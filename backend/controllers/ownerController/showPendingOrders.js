const Order = require('../../models/orderModel');
const Owner = require('../../models/ownerModel');

exports.showPendingOrders = async (req, res) => {
    const {company_name} = await Owner.findOne({ _id: req.userid }, { company_name: 1,_id:0 });
    const pendingOrderList = await Order.find({ company_name, status: "pending" });
    console.log(pendingOrderList)
    if (pendingOrderList) {
        res.status(200)
        res.json({
            pendingOrderList: pendingOrderList,
            found: true
        })
    }
    else {
        res.status(200)
        res.json({
            found: false
        })
    }
}