const Order = require("../../models/orderModel")
exports.fetchOrder = async (req, res) => {
    const { order_id } = req.body;
    console.log("from order query...", order_id);
    const order = await Order.find({ $and: [{ _id: order_id }, { worker_id: req.userid }] });
    console.log(order);
    if (order) {
        res.status(200);
        res.json({
            order,
            found: true
        })
    }
    else {
        res.status(201);
        res.json({
            found: false
        })
    }
}