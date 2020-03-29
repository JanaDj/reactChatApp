import React, { useState, useEffect } from "react";
import PrivateChatMessage from "../PrivateChat/PrivateChatMessage";
import PrivateMessageContainer from "../PrivateChat/PrivateMesssageContainer";
import PrivateChatHeader from "./PrivateChatHeader";
import styles from "../../styles/PrivateChatWindowStyle.module.css";

function PrivateChatWindow({ name, senderName, socket }) {
  const [togglePrivateChat, setTogglePrivateChat] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    name: ""
  });
  const [messages, setMessages] = useState({
    privateChats: [
      {
        name: "jana3",
        messages: []
      }
    ]
  });

  // handling messages
  useEffect(() => {
    socket.on("private-chat-message", data => {
      // setMessages([...messages, data]);
      saveMessage(data.name, data);
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
      saveMessage(name, message);
      // setMessages([...messages, { message: message, name: senderName }]);

      socket.emit("send-private-chat-message", message, name, () => {
        setMessage({
          ...message,
          message: ""
        });
      });
    }
  };

  /**
   * Function to handle new message
   * Function first checks if chat already exists in the messages object
   * if it does, it appends the messages array value of the key with the new message
   * if it doesnt, messages object is appended with the property of the new chat and new messages is stored in the messages array (value)
   * @param {string} chatName , name of the chat (key for the messages obj property)
   * @param {object} message , object containing sender and message text
   */
  const saveMessage = (chatName, message) => {
    const chatsArray = messages.privateChats;
    const exists = chatsArray.find(chatObj => chatObj.name === chatName);
    if (exists) {
      setMessages(prevState => ({
        privateChats: prevState.privateChats.map(privateChat =>
          privateChat.name === chatName
            ? {
                ...privateChat,
                messages: [...prevState.privateChats, message]
              }
            : privateChat
        )
      }));
      console.log(
        "iz ifa u saveMessage: " +
          messages.privateChats[0].name +
          messages.privateChats[0].messages
      );
    } else {
      setMessages(prevState => ({
        privateChats: [
          ...prevState.privateChats,
          {
            name: chatName,
            messages: [...prevState.privateChats, message]
          }
        ]
      }));
      console.log(
        "iz elsa u saveMessage: " +
          messages.privateChats[0].name +
          messages.privateChats[0].messages
      );
    }
  };

  // } else {

  // }

  return (
    <div className={styles.privateChatWindow}>
      <PrivateChatHeader name={name} onClick={handleTogglePrivateChat} />
      {togglePrivateChat ? (
        <div>
          {/* body */}
          <div className={styles.messageContainer}>
            <PrivateMessageContainer
              messages={messages.privateChats.find(
                privateChat => privateChat.name === name
              )}
              name={name}
            />
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
