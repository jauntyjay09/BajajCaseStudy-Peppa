const router = require('express').Router();
const Fund = require('../model/Fund');
const verify = require('./verifytoken');


//create fund
router.post('/',verify,async (req,res)=> {
    const fund =new Fund({
        icon:req.body.icon,
        name:req.body.name,
        current:req.body.current,
        target:req.body.target,
        email:req.user.email
    });

    try {
        const savedFund = await fund.save();
        res.json({'message':"fund added"});
    } catch (error) {
        res.status(400).json({"message":"fund not added"});
    }

});

//read fund
router.get('/',verify, async (req,res) => {
    try {
        const fund = await Fund.find({email:req.user.email});
        res.json(fund);    
    } catch (error) {
        res.json({"message":"Unable to fetch"});
    }
});

//update fund
router.patch('/',verify, async (req,res) => {
    try {
        const fundId=req.body.id;
        const updatedFund = await Fund.updateOne(
            {_id:fundId},
            {$set: {name:req.body.name}}
        );
        res.json({"message":"Updated Fund"});
    } catch (error) {
        res.json({"message":"Unable to update"});
    }
});


//delete fund
router.delete('/',async (req,res) => {
    try {
        const fundId=req.body.id;
        const removedFund = await Fund.deleteOne({_id:fundId});
        res.json({"message":"Deleted Fund"});
    } catch (error) {
        res.json({"message":"Unable to delete"});
    }
});




module.exports = router;