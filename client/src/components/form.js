import React, { useState } from "react";
import shareLocation from "../utils/geolocation";
import '../styles/form.css';

const Form = ({socket }) => {
  const [msg, setMsg] = useState("");

  const msgSubmit = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", msg, (res) => console.log(res));
    setMsg("");
  };

  return (
    <form className="form" onSubmit={(e) => msgSubmit(e)}>
      <input
        id="msgInput"
        value={msg}
        placeholder="Message..."
        autoComplete="off"
        onChange={(e) => setMsg(e.target.value)}
        required={true}
      />
      <button className="btn send" type="submit">Send</button>
      <button className="btn location" type="button" onClick={() => shareLocation(socket)}>Share Location</button>
    </form>
  );
};

export default Form;
