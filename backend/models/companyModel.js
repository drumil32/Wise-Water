const mongoose = require('mongoose');

const companySchema = mongoose.Schema(
    {
        name: {
            type: 'string',
            lowercase: true,
            unique: true,
            required: [true, "please give company name"]
        },
        email: {
            type: String, 
            lowercase: true, 
            unique: true, 
            required: [true, "can't be blank"], 
            match: [/\S+@\S+\.\S+/, 'is invalid']
        },
        contact:{
            type:Number,
            unique: [true,"contact number is already exist"],
            required:[true, "Cant't be blank"],
            match: [/^[(]?[0-9]{3}[)]?[\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/,"is Invalid"]
        },
        address: {
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
                type: Number
            },
            state: {
                type: String
            },
            
        },
        rating: {
            type: Number,
            default: 0
        },
        serviceTime: {
            // check when entry is made to database
            type: String,
            required: [true, "can't be blank"],
        }
    }
)

module.exports = mongoose.model('Company',companySchema);