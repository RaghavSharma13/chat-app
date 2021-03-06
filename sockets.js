const { generateMessage } = require("./utils/messages");
const {
  addUser,
  getUser,
  removeUser,
  getUsersInRoom,
} = require("./utils/userManagement");

const sockets = (io) => {
  io.on("connection", (socket) => {
    console.log("New WebSocket Connection");
    //emit is used to send an event to client and sent with a EventName(custom)
    //io.emit emits the event to every connection as opposed to socket

    socket.on("join", (credentials, callback) => {
      const { error, user } = addUser({
        id: socket.id,
        ...credentials,
      });
      if (error) return callback(error);

      socket.join(user.room);
      socket.emit("message", generateMessage("Admin", "Welcome!"));
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          generateMessage("Admin", `${user.username} has joined.`)
        );
      io.to(user.room).emit("roomData", {
        room: user.room,
        userList: getUsersInRoom(user.room),
      });
      callback();
    });

    socket.on("sendMessage", (msg, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit("message", generateMessage(user.username, msg));
      callback("deliverd");
    });

    socket.on("shareLocation", (coords, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit(
        "locationMessage",
        generateMessage(
          user.username,
          `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
        )
      );
      callback();
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit(
          "message",
          generateMessage("Admin", `${user.username} has left!`)
        );
        io.to(user.room).emit("roomData", {
          room: user.room,
          userList: getUsersInRoom(user.room),
        });
      }
    });
  });
};

module.exports = sockets;
