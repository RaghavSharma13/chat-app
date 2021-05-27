const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required:true,
        ref:'Room'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;