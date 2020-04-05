import React, { useState, useEffect } from "react";
import PrivateChatMessage from "../PrivateChat/PrivateChatMessage";
import PrivateMessageContainer from "../PrivateChat/PrivateMesssageContainer";
import PrivateChatHeader from "./PrivateChatHeader";
import styles from "../../styles/PrivateChatWindowStyle.module.css";

function PrivateChatWindow({ name, socket, chatId }) {
  console.log("chatid koji je dosao u privateChatWindow je: " + chatId);
  const [togglePrivateChat, setTogglePrivateChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
  const sendMessage = (event, name) => {
    event.preventDefault();
    if (message) {
      // saveMessage(name, message);
      setMessages([
        ...messages,
        {
          message,
          name,
          chatId,
        },
      ]);
      // setMessages([...messages, { message: message, name: senderName }]);

      socket.emit("send-private-chat-message", message, name, chatId, () => {
        console.log("emitovan trigger za private message: " + message + name);
        setMessage({
          ...message,
          message: "",
        });
      });
    }
  };

  // /**
  //  * Function to handle new message
  //  * Function first checks if chat already exists in the messages object
  //  * if it does, it appends the messages array value of the key with the new message
  //  * if it doesnt, messages object is appended with the property of the new chat and new messages is stored in the messages array (value)
  //  * @param {string} chatName , name of the chat (key for the messages obj property)
  //  * @param {object} message , object containing sender and message text
  //  */
  // const saveMessage = (chatName, message) => {
  //   const chatsArray = messages.privateChats;
  //   const exists = chatsArray.find((chatObj) => chatObj.name === chatName);
  //   if (exists) {
  //     setMessages((prevState) => ({
  //       privateChats: prevState.privateChats.map((privateChat) =>
  //         privateChat.name === chatName
  //           ? {
  //               ...privateChat,
  //               messages: [...prevState.privateChats, message],
  //             }
  //           : privateChat
  //       ),
  //     }));
  //   } else {
  //     setMessages((prevState) => ({
  //       privateChats: [
  //         ...prevState.privateChats,
  //         {
  //           name: chatName,
  //           messages: [...prevState.privateChats, message],
  //         },
  //       ],
  //     }));
  //   }
  // };

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
              // messages={messages.find(
              //   (privateChat) => privateChat.chatId === chatId
              // )}
              messages={messages}
              name={name}
              chatId={chatId}
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
