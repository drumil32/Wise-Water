const mongoose = require('mongoose');

const tempSchema = mongoose.Schema({
    latitude : {
        type : Number,
    }
    ,
    longitude : {
        type : Number,
    }
});

module.exports = mongoose.model("Temp",tempSchema);