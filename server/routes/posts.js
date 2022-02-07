const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifytoken');


router.get('/',verify,(req,res) => {
    res.send(req.user.email);
    ///User.findOne({_id:req.user})
    // res.json({
    //     posts:{
    //         title:'my first g post',
    //         description: 'lallalalal'
    //     }
    // });

});



module.exports = router;