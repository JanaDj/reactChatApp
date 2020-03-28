import React from "react";
import styles from "../../styles/ChatPageStyle.module.css";

function ChatMessage({ message, onChange, sendMessage }) {
  return (
    <div className={styles.messageBox}>
      {/* <div class="row"> */}
      <form className="col s12">
        <div>
          <div className="input-field col s12">
            <textarea
              id="textarea1"
              className={`materialize-textarea ${styles.messageTextArea}`}
              placeholder="Message..."
              value={message.message}
              onChange={onChange}
            ></textarea>
            <button
              className={`btn light-blue  ${styles.btn}`}
              onClick={sendMessage}
            >
              Message
            </button>
          </div>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
}

export default ChatMessage;
