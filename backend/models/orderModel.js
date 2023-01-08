const mongoose = require('mongoose');
const addressSchema = require('./addressModel');
const worker = require('./workerModel');

// water_type,water_temperature,water_quantity,companyname

const orderSchema = mongoose.Schema({
    water_type: {
        type: String,
        required: [true, "can't be blank"],
    },
    water_temperature: {
        type: String,
        required: [true, "can't be blank"],
    },
    water_quantity: {
        type: Number,
        required: [true, "can't be blank"],
    },
    address: {
        type: addressSchema,
        required: [true, "address is required"],
    },
    company_name: {
        type: String,
        required: true,
        ref: 'Company'
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    status:{
        type:String,
        required:true,
        defaultValue: 'pending'
    },
    worker_id:{
        type: mongoose.Schema.Types.ObjectId,
        defaultValue:null,
        ref:'Worker'
    }
});

module.exports = mongoose.model("Order", orderSchema);