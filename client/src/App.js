import "./App.css";
import io from "socket.io-client";
import ChatPage from "./components/chatPage";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const socket = io();
const App = () => {
  return (
    <Router>
      <Switch>
      <Route
          path="/chatpage"
          exact
          render={props=><ChatPage {...props} socket={socket} />}
      />
      <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
