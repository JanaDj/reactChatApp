import React, { createContext, useState } from "react";

export const ChatPageContext = createContext();

const ChatPageContextProvider = (props) => {
  const [messages, setMessages] = useState([]);
  // const [privateMessages, setPrivateMessages] = useState([]);

  /**
   *
   * @param {*} msgs
   */
  const updateMessages = (msgs) => {
    // check if msgs is iterable (if it is an array of messages or single msg)
    if (typeof msgs[Symbol.iterator] === "function") {
      setMessages([...messages, ...msgs]);
    } else {
      setMessages([...messages, msgs]);
    }
  };
  // /**
  //  *
  //  * @param {*} msgs
  //  */
  // const updatePrivateMessages = (msgs) => {
  //   // check if msgs is iterable (if it is an array of messages or single msg)
  //   if (typeof msgs[Symbol.iterator] === "function") {
  //     setPrivateMessages([...privateMessages, ...msgs]);
  //   } else {
  //     setPrivateMessages([...privateMessages, msgs]);
  //   }
  // };
  return (
    <ChatPageContext.Provider
      value={{
        messages,
        // privateMessages,
        updateMessages,
        // updatePrivateMessages,
      }}
    >
      {props.children}
    </ChatPageContext.Provider>
  );
};

export default ChatPageContextProvider;
