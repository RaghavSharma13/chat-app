import React, {useState} from 'react';
import "./App.css";
import io from "socket.io-client";
import ChatPage from "./components/chatPage";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const socket = io();
const App = () => {
  
  const [roomPassword, setRoomPassword]=useState('');
  return (
    <Router>
        <Switch>
        <Route
            path="/chatpage"
            render={props=><ChatPage {...props}  socket={socket} 
            />}
        />
        <Route path="/" exact render={props=><Home {...props} roomPassword={roomPassword}
            setRoomPass={setRoomPassword} />} />
        </Switch>
    </Router>
  );
};

export default App;
