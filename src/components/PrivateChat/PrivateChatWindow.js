import React, { useState, useEffect } from "react";
import PrivateChatMessage from "../PrivateChat/PrivateChatMessage";
import MessagesContainer from "../ChatPage/MessagesContainer";
import PrivateChatHeader from "./PrivateChatHeader";
import styles from "../../styles/PrivateChatWindowStyle.module.css";

function PrivateChatWindow({ name, senderName, socket }) {
  const [togglePrivateChat, setTogglePrivateChat] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    name: ""
  });
  const [messages, setMessages] = useState({});

  // triggered on component load
  // useEffect(() => {
  //   socket = io(ENDPOINT);

  //   return () => {
  //     socket.off();
  //   };
  // }, []);

  // handle messages
  // handling messages
  useEffect(() => {
    socket.on("private-chat-message", data => {
      console.log("primljena privatna poruka");
      setMessages([...messages, data]);
    });
  }, [messages, socket]);
  /**
   * Function to handle click on private chat
   * Function handles if body of the private chat should be displayed or not
   */
  const handleTogglePrivateChat = () => {
    setTogglePrivateChat(!togglePrivateChat); // check if prevState is needed in this case
  };

  /**
   * Function to handle input onChange event
   * @param {*} target ,
   */
  function handleChange({ target }) {
    setMessage(target.value);
  }

  /**
   * Function to handle onClick event to send public chat message
   * @param {*} event
   */
  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      setMessages([...messages, { message: message, name: senderName }]);
      console.log(
        "ime koje se prosledjuje u emitu private messagea je: " + name
      );
      socket.emit("send-private-chat-message", message, name, () => {
        setMessage({
          ...message,
          message: ""
        });
      });
    }
  };

  return (
    <div className={styles.privateChatWindow}>
      <PrivateChatHeader name={name} onClick={handleTogglePrivateChat} />
      {togglePrivateChat ? (
        <div>
          {/* body */}
          <div className={styles.messageContainer}>
            <MessagesContainer messages={messages} name={name} />
          </div>
          <PrivateChatMessage
            name={name}
            message={message}
            onChange={handleChange}
            sendMessage={sendMessage}
          />
        </div>
      ) : null}
    </div>
  );
}

export default PrivateChatWindow;
