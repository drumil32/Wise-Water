const Order = require('../../models/orderModel');
const Owner = require('../../models/ownerModel');

exports.showAssignedOrders = async (req, res) => {

    try {
        const { company_name } = await Owner.findOne({ _id: req.userid }, { company_name: 1, _id: 0 });
        console.log(company_name);
        const assignedOrders = await Order.find({ company_name, status: "assigned" })
        if (assignedOrders) {
            res.status(200).json({
                assignedOrders,
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