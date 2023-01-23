const WorkerApplication = require('../../models/workerApplicationModel');
const asyncHandler = require('express-async-handler');
const Owner = require('../../models/ownerModel');

exports.showWorkerApplications = asyncHandler(async (req,res)=>{
    console.log('from show worker applications')
    // const temp = (req.user.company_id);
    // console.log(temp);
    const {company_name} = await Owner.findOne({ _id: req.userid }, { company_name: 1,_id:0 });
    console.log(req.body);
    {
        
        const workerApplications = await WorkerApplication.find({company_name},{_id:0,password:0});
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