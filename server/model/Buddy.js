const mongoose = require('mongoose');

const buddySchema =new mongoose.Schema({

    name :{
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        max:255,
        min:6
    }
});

module.exports =mongoose.model('Buddy',buddySchema);