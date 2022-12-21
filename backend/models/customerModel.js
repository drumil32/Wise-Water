const mongoose = require('mongoose');
const customerSchema = mongoose.Schema({
    email: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    firstname: {type: String},
    lastname:{type: String},
    address: {
        type:[Object],
        bl
    },
    contact:{type:number, unique: true, required:[true, "Cant't be blank"],match: [/^[(]?[0-9]{3}[)]?[\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/,"is Invalid"]}
})
module.exports = mongoose.Model("Customer",customerSchema)