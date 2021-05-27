const User = require('../db/models/users');
const Room =require('../db/models/room');

const createRoom= async({room_name,username,id})=>{
  try{
    const admin = new User({
      user_id:id,
      username,
      room_name
    });
    const room = new Room({
      room_name,
      admin
    });
  }catch(err){
    console.log(err);
  }
}

const addUser = async({ id, username, room }) => {

  try{
      username = username.trim().toLowerCase();
      room = room.trim().toLowerCase();

      const exsistingUsers = await room.populate({
        path:'Members',
        match:username,
        options:{
          limit:1
        }
      }).execPopulate();

      if(exsistingUsers.length) throw new Error('username is in use. Use a different Username');

      const user = new User({
        user_id:id,
        username,
        room
      });
      return {user};
  }catch(error){
      //return {error};
      console.log(error);
  }
};

const removeUser=async(id)=>{
    try{
      const user = await User.findOneAndDelete({
        user_id:id
      });
      if(!user) throw new Error('User not found!')
      return user;
    }catch(err){
      console.log(err);
    }
}

const getUser=async(user_id)=>{
  try{
    const user = await User.findOne({user_id});
    if(!user) throw new Error("Coudn't get the user");
    return user;
  }catch(err){
    console.log(err);
  }  
}

const getUsersInRoom=async(room)=>{
    try{
      const members = room.populate({
        path:'Members'
      }).execPopulate();

      return members;
    }catch(err){
      console.log(err);
    }
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}