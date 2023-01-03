const mongoose = require('mongoose');
const addressSchema = mongoose.Schema(
    {
        line1: {
            type: String,
            required: [true,"line1 be blank"]
        },
        line2: {
            type: String
        },
        city: {
            type: String,
            required: [true,"city can not be blank"]
        },
        pincode: {
            type: String,
            reqired : [true,"pincode can not be blank"],
            // pincode validation is not right REASON :- it reject right picode as well
            // match:[/^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{6}$/,"Pincode is Invalid"] 
        },
        state: {
            type: String,
            required: [true, "can't be blank"], 
        },
    },
)

module.exports = addressSchema;