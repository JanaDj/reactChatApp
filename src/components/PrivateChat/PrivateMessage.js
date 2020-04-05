import React from "react";
import styles from "../../styles/PrivateChatWindowStyle.module.css";

function PrivateMessage({ message, name }) {
  let msgClass = `${styles.otherMsg}`;
  if (name === message.name) {
    msgClass = `${styles.ownMsg} light-blue`;
  }
  return (
    <div className={msgClass}>{`${message.name}: ${message.message}`}</div>
  );
}

export default PrivateMessage;
