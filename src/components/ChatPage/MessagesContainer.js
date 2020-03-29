import React from "react";
import styles from "../../styles/ChatPageStyle.module.css";
import Message from "./Message";

import ScrollToBottom from "react-scroll-to-bottom";

function MessagesContainer({ messages, name }) {
  return (
    <ScrollToBottom>
      {messages &&
        messages.map((msg, i) => <Message key={i} message={msg} name={name} />)}
    </ScrollToBottom>
  );
}

export default MessagesContainer;
