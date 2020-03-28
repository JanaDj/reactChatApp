import React from "react";
import styles from "../../styles/ChatPageStyle.module.css";

function ChatUser({ user, onChatClick }) {
  return (
    <li className="collection-item avatar">
      <img
        src=""
        alt="user-avatar"
        className="material-icons circle light-blue"
      />
      <p>{user.name}</p>
      <button
        className="secondary-content btn-flat"
        onClick={() => onChatClick(user)}
      >
        Chat
      </button>
    </li>
  );
}

export default ChatUser;
