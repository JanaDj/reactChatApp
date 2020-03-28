import React from "react";
import styles from "../../styles/ChatPageStyle.module.css";
function Message({ message, name }) {
  let msgClass = `${styles.otherMsg}`;
  if (name === message.name) {
    msgClass = `${styles.ownMsg} light-blue`;
  } else if (message.name === "chatAdmin") {
    msgClass = `${styles.chatInfo}`;
  }
  return (
    <div className={msgClass}>
      {message.name === "chatAdmin"
        ? `${message.message}`
        : `${message.name}: ${message.message}`}
    </div>
  );
}

export default Message;
