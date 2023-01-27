const WorkerApplication = require('../../models/workerApplicationModel');
const asyncHandler = require('express-async-handler');
const Worker = require('../../models/workerModel');
const bcrypt = require('bcryptjs');
const { passwordGen } = require('../../utility/passwordGenerator.js');

exports.hireWorker = async (req, res) => {

    const workerApplication = { ...req.body.workerApplication };
    delete workerApplication.applicationdate;
    workerApplication.password = await bcrypt.hash(passwordGen(10), 10);

    try {
        const checkWorkerApplication = await WorkerApplication.find({ company_name: workerApplication.company_name, email: workerApplication.email }, { _id: 0 });
        if (checkWorkerApplication) {
            console.log(workerApplication);
            const worker = await Worker.create({
                ...workerApplication
            });
            // when owner hire a worker
            // the all applications related to that user will be removed from workerApplication collection
            const val = await WorkerApplication.deleteMany({ $or: [{ email: worker.email }, { contact: worker.contact }] });
            res.status(200).json({
                message: 'success',
            });
        } else {
            console.log(error);
            res.status(404).json({
                error: {
                    errorMessage: ['worker application is not found']
                }
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