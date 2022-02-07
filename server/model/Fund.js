const mongoose = require('mongoose');

const fundSchema =new mongoose.Schema({

    icon :{
        type:String,
        required:true
    },
    name : {
        type:String,
        required:true
    },
    current:{
        type:Number,
        default:0
    },
    target:{
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

module.exports =mongoose.model('Fund',fundSchema);