const Workers = require('../../models/workerModel');
const asyncHandler = require('express-async-handler');
const Owner = require('../../models/ownerModel');

exports.showWorkers = async (req, res) => {
    console.log('from show workers')
    console.log(req.body);

    try {
        const { company_name } = await Owner.findOne({ _id: req.userid }, { company_name: 1, _id: 0 });
        const workers = await Workers.find({ company_name }, { password: 0 });

        res.status(200).json({
            workers,
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}