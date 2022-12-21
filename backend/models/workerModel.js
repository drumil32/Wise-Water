const mongoose = require('mongoose');
const workerSchema = mongoose.Schema({
    email: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    firstname: {
        type: String,
        required: [true, "can't be blank"], 
    },
    lastname:{
        type: String,
        required: [true, "can't be blank"], 
    },
    password:{
        type: String,
        required: [true, "can't be blank"], 
    },
    rating:{
        type:Number,
        default:0
    },
    joiningdate :{
        type:Date,
        default:Date.now
    },
    contact:{
        type:Number,
        unique: [true,"contact number is already exist"],
        required:[true, "Cant't be blank"],
        match: [/^[(]?[0-9]{3}[)]?[\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/,"is Invalid"]
    },
    company_id: {
        // we are giving type of foregine key 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref:'User' this allows user field to work as foregine key
        ref: 'Company'
    },
});
module.exports = mongoose.model('Worker',workerSchema);