const mongoose = require('mongoose');

const outcomeSchema =new mongoose.Schema({

    icon :{
        type:String,
        required:true
    },
    liabName : {
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
        
    },
    email : {
        type:String,
        required:true,
       
    }
});

module.exports =mongoose.model('Outcome',outcomeSchema);