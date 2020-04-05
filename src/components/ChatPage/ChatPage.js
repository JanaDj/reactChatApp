import React, { useState, useEffect, useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import UserList from "./UsersList";
import MessagesContainer from "./MessagesContainer";
import styles from "../../styles/ChatPageStyle.module.css";
import PrivateChatWindow from "../PrivateChat/PrivateChatWindow";
import { UserContext } from "../../Context/UserContext";
import { ChatPageContext } from "../../Context/ChatPageContext";
import io from "socket.io-client";

let socket;

function ChatPage({ location, history }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState({
    message: "",
    name: "",
  });
  // const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayPrivateChat, setDisplayPrivateChat] = useState([]);

  const { loggedInUser, updateLoggedInUser } = useContext(UserContext);
  const { messages, updateMessages } = useContext(ChatPageContext);

  const ENDPOINT = "http://127.0.0.1:3000";

  // triggered on component load
  useEffect(() => {
    socket = io(ENDPOINT);
    // temporary fix since context data is currently lost on page reload
    if (!loggedInUser.username) {
      // log in user again:
      history.push(`/login`);
    } else {
      setName(loggedInUser.username);
      getPublicMessages();

      socket.emit(
        "new-user",
        loggedInUser.username,
        loggedInUser.userId,
        (error) => {
          if (error) {
            alert("Error trying to connect to the chat");
          }
        }
      );
    }
    return () => {
      socket.emit("user-disconnected", name);
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // handling messages
  useEffect(() => {
    socket.on("user-connected", (data) => {
      updateMessages([
        { message: `${data} joined the channel`, name: "chatAdmin" },
      ]);
      // const msg = `${data} joined the channel`;
      // const name = "chatAdmin";
      // updateMessages(msg, name);
    });

    socket.on("user-disconnected", (data) => {
      updateMessages([
        { message: `${data} has left the channel`, name: "chatAdmin" },
      ]);
      // const msg = `${data} has left the channel`;
      // const name = "chatAdmin";
      // updateMessages(msg, name);
    });

    socket.on("chat-message", (data) => {
      updateMessages(data);
      // const msg = `${data} has left the channel`;
      // const name = "chatAdmin";
      // updateMessages(msg, name);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("start-private-chat", (sender, chatId) => {
      setDisplayPrivateChat([
        ...displayPrivateChat,
        {
          senderName: sender.name,
          chatId,
        },
      ]);
      console.log(chatId);
    });
  }, [messages, displayPrivateChat, updateMessages]);

  /**
   * Function to handle onClick event to send public chat message
   * @param {*} event
   */
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      updateMessages({ message: message, name: name });
      socket.emit("send-chat-message", message, loggedInUser.userId, () => {
        setMessage({
          ...message,
          message: "",
        });
      });
    }
  };

  /**
   * Function to handle onClick event to send public chat message
   * @param {*} event
   */
  const sendLink = (event, message) => {
    event.preventDefault();
    updateMessages({ message: message, name: name });
    socket.emit("send-chat-message", message, loggedInUser.userId, () => {
      setMessage({
        ...message,
        message: "",
      });
    });
  };
  /**
   * Function to get chat history for public chat
   * Function makes a GET request to the /getpublicmessages endpoint
   * This end point returns array of messages
   */
  function getPublicMessages() {
    fetch("http://127.0.0.1:3000/api/v1/messages/getpublicmessages")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        updateMessages(data);
      });
  }
  /**
   * Function to handle input onChange event
   * @param {*} target ,
   */
  function handleChange({ target }) {
    setMessage(target.value);
  }

  /**
   * Function to handle onClick event for the 'Chat' link in the active users chat
   * @param {user} receiver , object of type user, contains id and name
   */
  const onClickChat = (receiver) => {
    // emit socket event za private chat
    if (receiver.name !== name) {
      if (
        !displayPrivateChat.some(
          (privateChat) => privateChat.senderName === receiver.name
        )
      ) {
        socket.emit("privateChat", receiver.id, (chatId) => {
          console.log(
            "primljen chatId sa privateChat eventa sa servera je: " + chatId
          );
          setDisplayPrivateChat([
            ...displayPrivateChat,
            {
              senderName: receiver.name,
              chatId,
            },
          ]);
        });
      }
    }
  };

  /**
   * Function to close opened private chat
   * @param {integer} chatId , chatId of the private chat to close
   */
  const closePrivateChat = (chatId) => {};
  return (
    <div className="container">
      <ChatHeader />
      <div className={`${styles.chatWrapper}`}>
        <div className={`${styles.chatContainer}`}>
          <div className={styles.messagesContainer}>
            <MessagesContainer name={name} />
          </div>
          <ChatMessage
            message={message}
            onChange={handleChange}
            sendMessage={sendMessage}
            sendLink={sendLink}
          />
        </div>
        <div className={`${styles.chatListContainer}`}>
          <div className={styles.userListContainer}>
            <UserList users={users} onChatClick={onClickChat} />
          </div>
          <div className={`collection ${styles.privateChatsContainer}`}>
            {displayPrivateChat.length > 0 &&
              displayPrivateChat.map((chat, i) => (
                <PrivateChatWindow
                  socket={socket}
                  key={i}
                  name={chat.senderName}
                  chatId={chat.chatId}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
