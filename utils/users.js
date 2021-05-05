const users = [];

const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validate data
  if (!username || !room)
    return {
      error: "Username and room are required.",
    };

  //check for exsisting user
  const exsistingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  //validate username
  if (exsistingUser)
    return {
      error: "Username is in use!",
    };

  //store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser=(id)=>{
    const userIndex=users.findIndex((user)=>user.id===id);
    if(userIndex!==-1) return users.splice(userIndex,1);
}

const getUser=(id)=>{
    return users.find((user)=>user.id===id);
}

const getUsersInRoom=(room)=>{
    if(!room) return;
    room=room.trim().toLowerCase();
    const usersInRoom=users.filter((user)=>user.room===room);
    return usersInRoom;
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}