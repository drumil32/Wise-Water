

const {decodeJWTtoken} = require('../../utility/decodeJWTtoken');

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