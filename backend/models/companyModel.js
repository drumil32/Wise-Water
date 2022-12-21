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
            unique: [true, "email id is already exist"],
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, 'email is invalid']
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
                type: number
            },
            state: {
                type: String
            },
            required : [true,"can't be blank"],
            unique : [true,"it must be unique"]
        },
        rating: {
            type: number,
            default: 0
        },
        serviceTime: {
            type: string,
            required: [true, "can't be blank"],
        }
    }
)