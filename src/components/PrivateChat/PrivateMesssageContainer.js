import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

function PrivateMessageContainer({ messages, name }) {
  return (
    <ScrollToBottom>
      {/* {messages &&
        messages.map((msg, i) => <Message key={i} message={msg} name={name} />)} */}
    </ScrollToBottom>
  );
}

export default PrivateMessageContainer;
