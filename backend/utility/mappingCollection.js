const Customer = require('../models/customerModel')
const Owner = require('../models/ownerModel')
const Worker = require('../models/workerModel')

exports.mapCollectionName = (collectionName)=>{
    switch(collectionName){
        case "Customer":
            return Customer;
        case "Owner":
            return Owner;
        case "Worker":
            return Worker;
    }
}
