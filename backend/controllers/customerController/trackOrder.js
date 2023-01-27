const Order = require("../../models/orderModel")
const Worker = require("../../models/workerModel")

exports.trackOrder = async (req, res) => {

    const { order_id } = req.body;

    const order = await Order.findOne({ $and: [{ _id: order_id }, { customer_id: req.userid }] });

    if (order) {
        const worker = await Worker.findOne({ _id: order.worker_id });
        console.log(worker)
        if (worker) {
            res.status(200).json({
                order: order,
                worker
            })
        }
        else {
            res.status(404).json({
                error: "worker who is assigned for you order not found"
            })
        }
    } else {
        console.log(error);
        res.status(404).json({
            error: {
                errorMessage: ['order is not found']
            }
        })
    }
}