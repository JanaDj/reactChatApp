import React, { useState, useEffect, useContext } from "react";
import PrivateChatMessage from "../PrivateChat/PrivateChatMessage";
import PrivateMessageContainer from "../PrivateChat/PrivateMesssageContainer";
import PrivateChatHeader from "./PrivateChatHeader";
import styles from "../../styles/PrivateChatWindowStyle.module.css";
import { UserContext } from "../../Context/UserContext";

function PrivateChatWindow({ name, socket, chatId }) {
  console.log("chatid koji je dosao u privateChatWindow je: " + chatId);
  const [togglePrivateChat, setTogglePrivateChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { loggedInUser, updateLoggedInUser } = useContext(UserContext);

  // load chat history
  useEffect(() => {
    getChatMessages();
  }, []);
  // handling messages
  useEffect(() => {
    socket.on("private-chat-message", ({ message, name, chatId }) => {
      console.log("primljen private message" + message + name + chatId);
      // saveMessage(data.name, data);
      setMessages([
        ...messages,
        {
          message: message,
          name: name,
          chatId: chatId,
        },
      ]);
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
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      setMessages([
        ...messages,
        {
          message,
          name: loggedInUser.username,
          chatId,
        },
      ]);

      socket.emit(
        "send-private-chat-message",
        message,
        name,
        loggedInUser.userId,
        chatId,
        () => {
          setMessage({
            ...message,
            message: "",
          });
        }
      );
    }
  };

  /**
   * Function to get chat history for public chat
   * Function makes a GET request to the /getpublicmessages endpoint
   * This end point returns array of messages
   */
  function getChatMessages() {
    fetch(`http://127.0.0.1:3000/api/v1/messages/getmessages/${chatId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((msg) => {
          setMessages((prevState) => [
            ...prevState,
            {
              message: msg.message,
              name: msg.name,
              chatId: chatId,
            },
          ]);
        });
      });
  }

  return (
    <div className={styles.privateChatWindow}>
      <PrivateChatHeader name={name} onClick={handleTogglePrivateChat} />
      {togglePrivateChat ? (
        <div>
          {/* body */}
          <div className={styles.messageContainer}>
            <PrivateMessageContainer
              messages={messages}
              name={name}
              chatId={chatId}
            />
          </div>
          <PrivateChatMessage
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
