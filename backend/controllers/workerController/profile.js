exports.profile = (req,res) =>{
    console.log(req.body);
    console.log('worker profile')
    res.json({
        name : req.body.email,
        abc : 'this is worker profile'
    })
}