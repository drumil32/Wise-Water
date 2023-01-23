const mongoose = require('mongoose');

const workerOrderQuerySchema = mongoose.Schema({
    worker_id:{
        type: mongoose.Schema.Types.ObjectId,
        defaultValue:null,
        ref:'Worker'
    },
    worker_name:{
        type:String,
        required:true
    },
    worker_email:{
        type:String,
        required:true
    },
    worker_contact:{
        type:String,
        required:true
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        defaultValue:null,
        ref:'Order'
    },
    query:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("WorkerOrderQuery", workerOrderQuerySchema);