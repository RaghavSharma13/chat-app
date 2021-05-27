const express=require('express');
const path=require('path');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
require('./sockets')(io);


const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/chatpage*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client/build/index.html'),err=>{
    if(err) res.status(500).send(err);
  });
})

http.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
