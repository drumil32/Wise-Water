const Order = require('../../models/orderModel');

exports.orderDeliever = async (req, res) => {

    const { order_id } = req.body;

    try {
        const assignedOrder = await Order.find({ $and: [{ worker_id: req.userid }, { _id: order_id }] })
        if (assignedOrder) {
            const updated = await Order.updateOne({ _id: order_id }, { $set: { status: "delievered" } })
            res.status(200).json({
                message: 'success'
            })
        }
        else {
            res.status(404).json({
                error: {
                    errorMessage: ['order is not found']
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}