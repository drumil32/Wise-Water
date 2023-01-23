const Workers = require('../../models/workerModel');
const asyncHandler = require('express-async-handler');
const Owner = require('../../models/ownerModel');

exports.showWorkers = asyncHandler(async (req, res) => {
    console.log('from show workers')
    console.log(req.body);
    const { company_name } = await Owner.findOne({ _id: req.userid }, { company_name: 1, _id: 0 });
    const workers = await Workers.find({ company_name }, { password: 0 });
    if (workers) {
        res.status(200);
        res.json({
            workers,
            found: true,
        });
    } else {
        res.status(200);
        res.json({
            found: false,
        });
    }
})