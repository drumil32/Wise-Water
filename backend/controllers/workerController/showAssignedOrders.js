const Order = require('../../models/orderModel');
exports.showAssignedOrders = async (req, res) => {

    try {
        const assignedOrders = await Order.find({ $and: [{ worker_id: req.userid }, { status: { $eq: "assigned" } }] })
        res.status(200).json({
            found: true,
            assignedOrders: assignedOrders
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