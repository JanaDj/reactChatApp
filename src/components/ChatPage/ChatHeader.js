import React from "react";
import styles from "../../styles/ChatPageStyle.module.css";

function ChatHeader() {
  return (
    <div>
      <nav>
        <div className={`nav-wrapper ${styles.header}`}>
          <a href="#" className="brand-logo">
            Chat App
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a className="btn light-blue" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default ChatHeader;
