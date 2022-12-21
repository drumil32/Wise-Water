// importing DBmodels of users
const Customer = require('../models/customerModel');
const Company = require('../models/companyModel');
const Owner = require('../models/ownerModel');
const Worker = require('../models/workerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// getGoals gives all goals of currently authenticated user
// @desc    loginUser :- loggedin all types of users
// @route   post /api/user
// @access  public

const mapCollectionName = (collectionName)=>{
    switch(collectionName){
        case "Customer":
            return Customer;
        case "Owner":
            return Owner;
        case "Worker":
            return Worker;
    }
}

exports.loginUser = async (req,res)=>{
    const {email,password} = req.body;
    
    if ( !email || !password) {
        res.status(400);
        throw new Error('Please give all the details');
    }
    
    const collection = mapCollectionName(req.body.colName);
    
    const user = await collection.findOne({email});

    if( user && (await bcrypt.compare(password, user.password) ) ){
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid creadtionals');
    }
}


const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

// registerUser registers any user
// @desc    registerUser :- register user according to role, if owner is registyering then check companey id and       companey name
// @route   get /api/user/register
// @access  public

exports.registerUser = (req,res)=>{
    const {dbName, registerDetails} = req.body;
    const collection = mapCollectionName(dbName);
    collection.insertOne({});
}