const mongoose = require('mongoose');

const incomeSchema =new mongoose.Schema({

    icon :{
        type:String,
        required:true
    },
    assetName : {
        type:String,
        required:true
    },
    type:{
        type:String
    },
    amount:{
        type:Number,
        required:true
        
    },
    email : {
        type:String,
        required:true,
        max:255,
        min:6
    }
});

module.exports =mongoose.model('Income',incomeSchema);