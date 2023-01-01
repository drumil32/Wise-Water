const WorkerApplication = require('../../models/workerApplicationModel');
const asyncHandler = require('express-async-handler');



exports.showWorkerApplications = asyncHandler(async (req,res)=>{
    
    {
        
        const workerApplications = await WorkerApplication.find({},{_id:0,password:0});
        if (workerApplications){
            res.status(200);
            res.json({
                workerApplications,
                found:true,
            });
        }else{
            res.status(200);
            res.json({
                found:false,
            });
        }
    }
})