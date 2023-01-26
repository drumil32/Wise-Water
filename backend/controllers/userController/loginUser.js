const asyncHandler = require('express-async-handler');
const { mapCollectionName } = require('../../utility/mappingCollection');
const { generateJWTtoken } = require('../../utility/generateJWTtoken');
const bcrypt = require('bcryptjs');

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