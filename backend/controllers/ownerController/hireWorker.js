const WorkerApplication = require('../../models/workerApplicationModel');
const asyncHandler = require('express-async-handler');
const Worker = require('../../models/workerModel');
const bcrypt = require('bcryptjs');
const {passwordGen} = require('../../utility/passwordGenerator.js');

exports.hireWorker = asyncHandler(async (req,res)=>{
    console.log('from hire worker')
    // const temp = (req.user.company_id);
    const workerApplication = {...req.body.workerApplication};
    delete workerApplication.applicationdate;
    console.log(workerApplication);
    // console.log(temp);
    console.log('from hire fxn');
    console.log(req.body);
    // console.log(req.user.company_id);
    // console.log(req.body.email)
    const password = passwordGen(10)
    console.log(password);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    workerApplication.password = hashPassword;
    {
        const db_workerApplication = await WorkerApplication.find({company_name:req.user.company_name,email:req.body.workerApplication.email},{_id:0});
        if (db_workerApplication){
            // console.log(val);
            // delete workerApplication.company_id
            workerApplication.company_name = req.user.company_name;
            console.log(workerApplication);
            const worker = await Worker.create({
                ...workerApplication
            });
            const val = await WorkerApplication.deleteMany({email:worker.email});

            res.status(200);
            res.json({
                workerApplication,
                found:true,
            });
        }else{
            res.status(400);
            throw new Error('worker application not found');
        }
    }
})