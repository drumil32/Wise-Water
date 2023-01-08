const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");

const workerApplicationSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    firstname: {
        type: String,
        required: [true, "can't be blank"],
    },
    lastname: {
        type: String,
        required: [true, "can't be blank"],
    },
    password: {
        type: String,
        required: [true, "can't be blank"],
    },
    applicationdate: {
        type: Date,
        default: dateIndia
    },
    contact: {
        type: Number,
        required: [true, "Cant't be blank"],
        match: [/^[(]?[0-9]{3}[)]?[\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/, "is Invalid"]
    },
    company_name: {
        // we are giving type of foregine key 
        type: mongoose.Schema.Types.String,
        required: true,
        // ref:'User' this allows user field to work as foregine key
        ref: 'Company'
    },
}
);
module.exports = mongoose.model('WorkerApplication', workerApplicationSchema);