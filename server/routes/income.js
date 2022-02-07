const router = require('express').Router();
const Income = require('../model/Income');
const verify = require('./verifytoken');


//create Income
router.post('/',verify,async (req,res)=> {
    const income =new Income({
        icon:req.body.icon,
        assetName:req.body.name,
        type:req.body.type,
        amount:req.body.amount,
        email:req.user.email
    });

    try {
        const savedIncome = await income.save();
        res.json({'message':"income added"});
    } catch (error) {
        res.status(400).json({"message":"income not added"});
    }

});

//read Income
router.get('/',verify, async (req,res) => {
    try {
        const income = await Income.find({email:req.user.email});
        res.json(income);    
    } catch (error) {
        res.json({"message":"Unable to fetch"});
    }
});

//update Income
router.patch('/',verify, async (req,res) => {
    try {
        const incomeId=req.body.id;
        const updatedIncome = await Income.updateOne(
            {_id:incomeId},
            {$set: {assetName:req.body.name}}
        );
        res.json({"message":"Updated Income"});
    } catch (error) {
        res.json({"message":"Unable to update"});
    }
});


//delete Income
router.delete('/',async (req,res) => {
    try {
        const incomeId=req.body.id;
        const removedIncome = await Income.deleteOne({_id:incomeId});
        res.json({"message":"Deleted Income"});
    } catch (error) {
        res.json({"message":"Unable to delete"});
    }
});




module.exports = router;