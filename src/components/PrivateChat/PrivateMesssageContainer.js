import React from "react";
import Message from "../ChatPage/Message";
import ScrollToBottom from "react-scroll-to-bottom";

function PrivateMessageContainer({ messages, name, chatId }) {
  return (
    <ScrollToBottom>
      {console.log("poruke koje vidi container " + typeof messages)}
      {messages &&
        messages.map((msg, i) =>
          msg.chatId === chatId ? (
            <Message key={i} message={msg} name={name} />
          ) : // />
          null
        )}
      {/*  */}
    </ScrollToBottom>
  );
}

export default PrivateMessageContainer;
