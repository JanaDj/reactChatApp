import React, { useState, useEffect, useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import UserList from "./UsersList";
import MessagesContainer from "./MessagesContainer";
import styles from "../../styles/ChatPageStyle.module.css";
import PrivateChatWindow from "../PrivateChat/PrivateChatWindow";
import { UserContext } from "../../Context/UserContext";
import io from "socket.io-client";

let socket;

function ChatPage({ location, history }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState({
    message: "",
    name: ""
  });
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayPrivateChat, setDisplayPrivateChat] = useState([]);

  const { loggedInUser, updateLoggedInUser } = useContext(UserContext);
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
        error => {
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
    socket.on("user-connected", data => {
      setMessages([
        ...messages,
        { message: `${data} joined the channel`, name: "chatAdmin" }
      ]);
    });

    socket.on("user-disconnected", data => {
      setMessages([
        ...messages,
        { message: `${data} has left the channel`, name: "chatAdmin" }
      ]);
    });

    socket.on("chat-message", data => {
      setMessages([...messages, data]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("start-private-chat", data => {
      setDisplayPrivateChat([
        ...displayPrivateChat,
        {
          senderName: data.name
        }
      ]);
    });
  }, [messages, displayPrivateChat]);

  /**
   * Function to handle onClick event to send public chat message
   * @param {*} event
   */
  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      setMessages([...messages, { message: message, name: name }]);
      socket.emit("send-chat-message", message, loggedInUser.userId, () => {
        setMessage({
          ...message,
          message: ""
        });
      });
    }
  };
  /**
   * Function to get chat history for public chat
   * Function makes a GET request to the /getpublicmessages endpoint
   * This end point returns array of messages
   */
  function getPublicMessages() {
    fetch("http://127.0.0.1:3000/getpublicmessages")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setMessages(data);
        // data.array.forEach(element => {
        //   setMessages({
        //     ...messages,

        //   })

        // });
        console.log(messages);
      });
  }
  // /**
  //  * Function to add chat-user relation to the chatuser table
  //  * @param {int} chatId id of the chat user is joining
  //  * @param {int} userId id of the user that is joining the chat
  //  */
  // function addUserToChat(chatId, userId) {
  //   fetch("http://127.0.0.1:3000/chatuser", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({
  //       chatId,
  //       userId
  //     })
  //   }).catch(error => {
  //     //  handle error
  //     console.log("error adding chat-user relation", error);
  //   });
  // }
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
  const onClickChat = receiver => {
    console.log(receiver.name);
    // emit socket event za private chat
    if (receiver.name !== name) {
      if (
        !displayPrivateChat.some(
          privateChat => privateChat.senderName === receiver.name
        )
      ) {
        socket.emit("privateChat", receiver.id);
        setDisplayPrivateChat([
          ...displayPrivateChat,
          {
            senderName: receiver.name
          }
        ]);
      }
    }
  };

  return (
    <div className="container">
      <ChatHeader />
      <div className={`${styles.chatWrapper}`}>
        <div className={`${styles.chatContainer}`}>
          <div className={styles.messagesContainer}>
            <MessagesContainer messages={messages} name={name} />
          </div>
          <ChatMessage
            message={message}
            onChange={handleChange}
            sendMessage={sendMessage}
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
                  // sendMessage={sendPrivateMessage}
                  // messages={privateMessages}
                  socket={socket}
                  key={i}
                  senderName={name}
                  name={chat.senderName}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
