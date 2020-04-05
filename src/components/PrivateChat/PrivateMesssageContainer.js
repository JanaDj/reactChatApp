import React, { useContext } from "react";
import PrivateMessage from "../PrivateChat/PrivateMessage";
import ScrollToBottom from "react-scroll-to-bottom";
import { UserContext } from "../../Context/UserContext";

function PrivateMessageContainer({ messages, chatId }) {
  const { loggedInUser, updateLoggedInUser } = useContext(UserContext);

  return (
    <ScrollToBottom>
      {console.log("poruke koje vidi container " + typeof messages)}
      {messages &&
        messages.map((msg, i) =>
          msg.chatId === chatId ? (
            <PrivateMessage
              key={i}
              message={msg}
              name={loggedInUser.username}
            />
          ) : // />
          null
        )}
      {/*  */}
    </ScrollToBottom>
  );
}

export default PrivateMessageContainer;
