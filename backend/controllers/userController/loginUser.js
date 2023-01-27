const asyncHandler = require('express-async-handler');
const { mapCollectionName } = require('../../utility/mappingCollection');
const { generateJWTtoken } = require('../../utility/generateJWTtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// @desc    loginUser :- loggedin all types of users
// @route   post /api/user
// @access  public

exports.loginUser = async (req, res) => {

    const { email, password } = req.body;
    var error = [];
    // login validation
    if (!email) {
        error.push('email is required')
    }
    if (email && !validator.isEmail(email)) {
        error.push('email is not a valid');
    }
    if (!password) {
        error.push('password is required')
    }

    if (error.length > 0) {
        res.status(400).json({
            error: {
                errorMessage: error
            }
        });
    } else {
        const collection = mapCollectionName(req.body.collectionName);
        
        const user = await collection.findOne({ email }, { password: 1, _id: 1 });
        
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                token: generateJWTtoken(user._id, req.body.collectionName) // whty every time create new token
            });
        } else {
            res.status(400).json({
                error : {
                    errorMessage : ['invalid credential']
                }
            })
        }
    }
}