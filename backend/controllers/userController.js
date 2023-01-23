// importing DBmodels of users
const Customer = require('../models/customerModel');
const Company = require('../models/companyModel');
const Owner = require('../models/ownerModel');
const Worker = require('../models/workerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { mapCollectionName } = require('../utility/mappingCollection');
const { generateJWTtoken } = require('../utility/generateJWTtoken');

const {decodeJWTtoken} = require('../utility/decodeJWTtoken');


// @desc    loginUser :- loggedin all types of users
// @route   post /api/user
// @access  public

exports.loginUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    console.log('from loginuser')
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please give all the details');
    }
    console.log(email, password);
    const collection = mapCollectionName(req.body.collectionName);
    console.log(collection);
    const user = await collection.findOne({ email },{password:1,_id:1});
    console.log(user)
    // console.log(user);
    // console.log(collection + "from")
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            // seems like on login page we are not using it at all then 
            // WHY WE SHOULD PASS IT . Hence, I commented this part
            // id: user._id,
            // name: user.name,
            // email: user.email,  
            token: generateJWTtoken(user._id, req.body.collectionName) // whty every time create new token
        });
    } else {
        res.status(400);
        throw new Error('Invalid creadtionals');
    }
});

// @desc    giveUserType :- it will decode jwt token and give user type
// @route   post /api/user/
// @access  public

exports.giveUserType =  (req, res) => {

    const { authorization } = req.headers
    console.log('from user type')
    console.log(authorization)
    if( 'Bearer undefined' !== authorization ){
        const decodedToken = decodeJWTtoken(req,res);
        res.json({
            userType : decodedToken.collectionName.toLowerCase(),
        })
    }else
    {
        res.json({
            userType : 'guest'
        });
    }
};

// @desc    updateUser :- update all types of users
// @route   post /api/user/
// @access  private

// FOR NOW IT IS NOT IN USE
// exports.profileUpdate = asyncHandler(async (req, res) => {
//     const {firstname,lastname,address} = req.body;
//     const collection = mapCollectionName(req.body.collectionName);

//     if (!firstname || !lastname) {
//         res.status(400);
//         throw new Error('Please give all the details');
//     }

//     if ('Worker' !== req.body.collectionName) {
//         if (!address) {
//             res.status(400);
//             throw new Error('Please give address');
//         }
//     }
//     let user;
//     if ('Worker' !== req.body.collectionName) {
//         user = await collection.updateOne({ '_id': req.user._id }, { $set: { firstname, lastname, address } });
//     } else {
//         user = await collection.updateOne({ '_id': req.user._id }, { $set: { firstname, lastname } });
//     }

//     if (user) {
//         res.json({
//             id: user._id,
//             name: user.name,
//             email: user.email,
//         });
//     } else {
//         res.status(400);
//         throw new Error('something went wrong while storing database');
//     }
// })