const router = require('express').Router();
const Outcome = require('../model/Outcome');
const verify = require('./verifytoken');


//create outcome
router.post('/',verify,async (req,res)=> {
    const outcome =new Outcome({
        icon:req.body.icon,
        liabName:req.body.name,
        amount:req.body.amount,
        email:req.user.email
    });

    try {
        const savedOutcome = await outcome.save();
        res.json({'message':"outcome added"});
    } catch (error) {
        res.status(400).json({"message":"outcome not added"});
    }

});

//read outcome
router.get('/',verify, async (req,res) => {
    try {
        const outcome = await Outcome.find({email:req.user.email});
        res.json(outcome);    
    } catch (error) {
        res.json({"message":"Unable to fetch"});
    }
});

//update outcome
router.patch('/',verify, async (req,res) => {
    try {
        const outcomeId=req.body.id;
        const updatedOutcome = await Outcome.updateOne(
            {_id:outcomeId},
            {$set: {assetName:req.body.name}}
        );
        res.json({"message":"Updated Outcome"});
    } catch (error) {
        res.json({"message":"Unable to update"});
    }
});


//delete outcome
router.delete('/',async (req,res) => {
    try {
        const outcomeId=req.body.id;
        const removedOutcome = await Outcome.deleteOne({_id:outcomeId});
        res.json({"message":"Deleted Outcome"});
    } catch (error) {
        res.json({"message":"Unable to delete"});
    }
});




module.exports = router;