const router = require('express').Router();
const Buddy = require('../model/Buddy');
const verify = require('./verifytoken');


//create buddy
router.post('/',verify,async (req,res)=> {
    const buddy =new Buddy({
        name:req.body.name,
        email:req.user.email
    });

    try {
        const savedBuddy = await buddy.save();
        res.json({'message':"buddy added"});
    } catch (error) {
        res.status(400).json({"message":"buddy not added"});
    }

});

//read buddy
router.get('/',verify, async (req,res) => {
    try {
        const buddy = await Buddy.find({email:req.user.email});
        res.json(buddy);    
    } catch (error) {
        res.json({"message":"Unable to fetch"});
    }
});

//update buddy
router.patch('/',verify, async (req,res) => {
    try {
        const buddyId=req.body.id;
        const updatedBuddy = await Buddy.updateOne(
            {_id:buddyId},
            {$set: {name:req.body.name}}
        );
        res.json({"message":"Updated Buddy"});
    } catch (error) {
        res.json({"message":"Unable to update"});
    }
});


//delete buddy
router.delete('/',async (req,res) => {
    try {
        const buddyId=req.body.id;
        const removedBuddy = await Buddy.deleteOne({_id:buddyId});
        res.json({"message":"Deleted Buddy"});
    } catch (error) {
        res.json({"message":"Unable to delete"});
    }
});


// router.get('/',verify,(req,res) => {
//     res.send(req.user);
//     ///User.findOne({_id:req.user})
//     // res.json({
//     //     posts:{
//     //         title:'my first g post',
//     //         description: 'lallalalal'
//     //     }
//     // });

// });



module.exports = router;