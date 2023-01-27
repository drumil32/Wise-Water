const Order = require('../../models/orderModel');
exports.showDelieverOrders = async (req, res) => {

    try {
        const delieveredOrders = await Order.find({ $and: [{ worker_id: req.userid }, { status: "delievered" }] })
        res.status(200).json({
            delieveredOrders
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}