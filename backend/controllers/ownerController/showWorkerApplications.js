const WorkerApplication = require('../../models/workerApplicationModel');
const asyncHandler = require('express-async-handler');
const Owner = require('../../models/ownerModel');

exports.showWorkerApplications = async (req, res) => {
    console.log('from show worker applications')
    // const temp = (req.user.company_id);
    // console.log(temp);
    console.log(req.body);
    try {
        const { company_name } = await Owner.findOne({ _id: req.userid }, { company_name: 1, _id: 0 });
        const workerApplications = await WorkerApplication.find({ company_name }, { _id: 0, password: 0 });
        res.status(200).json({
            workerApplications,
            found: true,
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