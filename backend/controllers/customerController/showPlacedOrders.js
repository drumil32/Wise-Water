const Company = require('../../models/companyModel');
const Order = require('../../models/orderModel');
const asyncHandler = require('express-async-handler');

// showPlacedOrders user type : customer
// @desc    showPlacedOrders : customer can see placed orders by this controller
// @route   post /api/customer/show-placed-orders
// @access  private
// applied middleware :- userTypeHandler , protect

exports.showPlacedOrders = asyncHandler(async (req, res) => {
    console.log('from show placed orders')
    const orderList = await Order.find({ customer_id: req.user._id });
    console.log(orderList)
    if (orderList) {
        res.json({
            orderList,
        });
    } else {
        res.status(400);
        throw new Error('some thing went wrong try again');
    }
});