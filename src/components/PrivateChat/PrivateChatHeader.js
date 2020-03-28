import React from "react";
import styles from "../../styles/PrivateChatWindowStyle.module.css";

function PrivateChatHeader({ name, onClick }) {
  return (
    <div className={`${styles.chatHeaderWrapper} light-blue`}>
      <div className={styles.headerTitle} onClick={() => onClick()}>
        <p>{name} </p>
      </div>
      <div className={styles.closeHeaderBtnContainer}>
        <button
          className={`btn-floating btn-small waves-effect waves-light red`}
        >
          <i className={`material-icons`}>X</i>
        </button>
      </div>
    </div>
  );
}

export default PrivateChatHeader;
