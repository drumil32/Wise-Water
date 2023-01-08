const Workers = require('../../models/workerModel');
const asyncHandler = require('express-async-handler');

exports.showWorkers = asyncHandler(async (req,res)=>{
    console.log('from show workers')
    console.log(req.body);
    {
        
        const workers = await Workers.find({company_name:req.user.company_name},{password:0});
        if (workers){
            
            res.status(200);
            res.json({
                workers,
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