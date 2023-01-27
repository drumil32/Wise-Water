const Order = require('../../models/orderModel');
const Owner = require('../../models/ownerModel');

exports.showPendingOrders = async (req, res) => {

    try {
        const { company_name } = await Owner.findOne({ _id: req.userid }, { company_name: 1, _id: 0 });
        const pendingOrderList = await Order.find({ company_name, status: "pending" });
        console.log(pendingOrderList)
        res.status(200).json({
            pendingOrderList: pendingOrderList,
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