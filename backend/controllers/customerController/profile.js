exports.profile = (req,res) =>{
    console.log(req.body);
    res.json({
        name : req.body.email
    })
}