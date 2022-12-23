exports.profile = (req,res) =>{
    console.log(req.body);
    console.log('owner profile')
    res.json({
        name : req.body.email,
        abc : 'this is owner profile'
    })
}