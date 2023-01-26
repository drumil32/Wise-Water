const Order = require('../../models/orderModel');
const asyncHandler = require('express-async-handler');
const { orderValidation } = require('../../validations/orderValidation/orderValidation')

// placeorder user type : customer
// @desc    placeorder : customer can placeorder by this function
// @route   post /api/customer/placeorder
// @access  private
// applied middleware :- userTypeHandler , protect

exports.placeorder = asyncHandler(async (req, res) => {
    const { water_type, water_temperature, water_quantity, companyname, address } = req.body.order;

    const error = await orderValidation(req.body.order);

    if (error && error.errorMessage.length > 0) {
        res.status(error.statusCode).json({
            error: {
                errorMessage: error.errorMessage
            }
        });
    } else {
        try {
            const order = await Order.create({
                water_type,
                water_temperature,
                water_quantity,
                address,
                company_name: companyname,
                status: 'pending',
                customer_id: req.userid,
            });

            res.status(200).json({
                message: 'from place order'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: {
                    errorMessage: ['Interanl Server Error']
                }
            })
        }

    }
});