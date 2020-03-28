import React from "react";
import ChatUser from "./ChatUser";
import styles from "../../styles/ChatPageStyle.module.css";

function UsersList({ users, onChatClick }) {
  return (
    <div className={styles.userList}>
      <ul className="collection">
        {users.map((user, i) => (
          <ChatUser key={i} user={user} onChatClick={onChatClick} />
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
