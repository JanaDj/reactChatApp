import React, { useContext } from "react";
import Message from "./Message";
import { ChatPageContext } from "../../Context/ChatPageContext";
import ScrollToBottom from "react-scroll-to-bottom";

function MessagesContainer({ name }) {
  const { messages, updateMessages } = useContext(ChatPageContext);
  return (
    <ScrollToBottom>
      {messages &&
        messages.map((msg, i) => <Message key={i} message={msg} name={name} />)}
      {/*  */}
    </ScrollToBottom>
  );
}

export default MessagesContainer;
