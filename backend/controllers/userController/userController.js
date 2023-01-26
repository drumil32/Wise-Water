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