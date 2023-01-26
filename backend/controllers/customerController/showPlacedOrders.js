const Order = require('../../models/orderModel');


// showPlacedOrders user type : customer
// @desc    showPlacedOrders : customer can see placed orders by this controller
// @route   post /api/customer/show-placed-orders
// @access  private
// applied middleware :- userTypeHandler , protect

exports.showPlacedOrders = async (req, res) => {
    try {
        const orderList = await Order.find({ customer_id: req.userid });
        res.status(200).json({
            orderList,
        });
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
};