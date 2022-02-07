const router = require('express').Router();
const User = require('../model/User');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');



//register
router.post('/register', async (req,res)=>{

    //check if already in db
    const emailexists = await User.findOne({email:req.body.email});
    if(emailexists) return res.status(400).send({"message":'Email Already Exists Kindly Login'});

    //hash passwords
    const salt =await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(req.body.password,salt);

    //create new user
    const user =new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({chk:true});
    } catch (error) {
        res.send({chk:false});
    }

});

//login
router.post('/login',async (req,res) => {

    
    //check if user already in db
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('You are not registered');

    //if password is crct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass)return res.status(400).send('Invalid password');

    //create and assign token
    const token = jwt.sign({_id:user._id,email:user.email},process.env.Token_secret);
    res.send({name:user.name,chk:true,token:token});


});


module.exports = router;