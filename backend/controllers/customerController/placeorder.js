
// placeorder user type : customer
// @desc    placeorder : customer can placeorder by this function
// @route   post /api/customer/placeorder
// @access  private
// applied middleware :- userTypeHandler , protect

exports.placeorder = (req,res) =>{
    const {water_type,water_temperature,water_quantity,companyname} = req.body.order;
    console.log('this is')
    console.log(req.body.order);
    if( ''===water_type || ''===water_temperature || ''===water_quantity || ''===companyname ){
        res.status(400);
        throw new Error('please provide all the details');
    }
    res.json({
        message : 'from place order'
    })
}