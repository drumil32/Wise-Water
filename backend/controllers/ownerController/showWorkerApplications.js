const WorkerApplication = require('../../models/workerApplicationModel');
const asyncHandler = require('express-async-handler');



exports.showWorkerApplications = asyncHandler(async (req,res)=>{
    console.log('from show worker applications')
    const temp = (req.user.company_id);
    console.log(temp);
    console.log(req.body);
    {
        
        const workerApplications = await WorkerApplication.find({company_id:req.user.company_id},{_id:0,password:0});
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