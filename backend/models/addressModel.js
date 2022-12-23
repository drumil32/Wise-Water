const mongoose = require('mongoose');
const addressSchema = mongoose.Schema(
    {
        line1: {
            type: String
        },
        line2: {
            type: String
        },
        city: {
            type: String
        },
        pincode: {
            type: String,
            match:[/^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$/,"Pincode is Invalid"]
        },
        state: {
            type: String,
            required: [true, "can't be blank"], 
        },
    },
)

module.exports = addressSchema;