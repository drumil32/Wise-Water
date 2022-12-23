// importing DBmodels of users
const Customer = require('../models/customerModel');
const Company = require('../models/companyModel');
const Owner = require('../models/ownerModel');
const Worker = require('../models/workerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const {mapCollectionName} = require('../utility/mappingCollection');
const {generateJWTtoken} = require('../utility/generateJWTtoken');

// getGoals gives all goals of currently authenticated user 
// @desc    loginUser :- loggedin all types of users
// @route   post /api/user
// @access  public

exports.loginUser = asyncHandler(async (req,res)=>{
    console.log(req.body);
    console.log('from loginuser')
    const {email,password} = req.body;
    
    if ( !email || !password) {
        res.status(400);
        throw new Error('Please give all the details');
    }
    
    const collection = mapCollectionName(req.body.collectionName);
    
    const user = await collection.findOne({email});
    console.log(user);
    console.log(collection + "from")
    if( user && (await bcrypt.compare(password, user.password) ) ){
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token:generateJWTtoken(user._id,req.body.collectionName) // whty every time create new token
        });
    }else{
        res.status(400);
        throw new Error('Invalid creadtionals');
    }
});