const Order = require('../../models/orderModel');
exports.orderDeliever = async (req, res) => {
    const assignedOrder = await Order.find({ $and: [{ worker_id: req.userid }, {_id: req.body.order_id }] })
    if (assignedOrder) {
        const updated = await Order.updateOne({ _id: req.body.order_id }, { $set: { status: "delievered" } })
        if (updated) {
            const assignedOrders = await Order.find({ $and: [{ worker_id: req.userid }, { status: "assigned" }] })
            console.log("from order deliever", updated)
            console.log(assignedOrder)
            // console.log(req.body.order_id, req.user)
            res.status(200)
            res.json({
                found: true,
                assignedOrders: assignedOrders
            })
        }
    }
    else {
        res.status(204)
        res.json({
            found: false
        }
        )
    }
}