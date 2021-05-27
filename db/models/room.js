const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    admin:{
        type:String,
        required:true
    }
})

roomSchema.virtual('Members',{
    ref:'Users',
    localField:'_id',
    foreignField:'room'
})

const Room = mongoose.model('Room', roomSchema);

module.exports=Room;