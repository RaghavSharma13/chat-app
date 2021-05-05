import React, { useState, useEffect } from "react";
import Form from "./form";
import "../styles/messageWindow.css";

const MessageWindow = ({ socket }) => {
  const [chat, setChat] = useState([]);
  const renderChat = () => {
    return chat.map(({ msg, username, createdAt, type }, index) => {
      return (
        <div key={index} className="message">
          <div className="message--header">
            <span className="header--name">{username}</span>
            <span className="header--meta">{createdAt}</span>
          </div>
          {type === "text" ? (
            <p>{msg}</p>
          ) : (
            <a href={msg} target="blank">
              My Current Location
            </a>
          )}
        </div>
      );
    });
  };

  const autoscroll = () => {
    //getting the messageWindow
    const $messageWindow = document.querySelector(".messageWindow");

    //getting new Message Element
    const $newMessage = $messageWindow.lastElementChild;

    //height of last Message
    const newMessageMargin = parseInt(
      getComputedStyle($newMessage).marginBottom
    );
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    //visible height
    const visibleHeight = $messageWindow.offsetHeight;

    //messageWindow full height
    const containerHeight = $messageWindow.scrollHeight;

    //offset height from top
    const scrollOffset = $messageWindow.scrollTop + visibleHeight;

    if (containerHeight - newMessageHeight <= scrollOffset)
      $messageWindow.scrollTop = $messageWindow.scrollHeight;
  };

  useEffect(() => {
    socket.on("message", (msgObj) => {
      setChat((prevState) => [...prevState, { ...msgObj, type: "text" }]);
      autoscroll();
    });

    socket.on("locationMessage", (msgObj) => {
      setChat((prevState) => [...prevState, { ...msgObj, type: "link" }]);
      autoscroll();
    });
  }, []);
  return (
    <div className="chat-main">
      <div className="messageWindow">{renderChat()}</div>
      <Form socket={socket} />
    </div>
  );
};

export default MessageWindow;
