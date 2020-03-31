import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [loggedInUser, setLoggedInUser] = useState({
    userId: "",
    username: "",
    password: ""
  });

  const updateLoggedInUser = (userId, username, password) => {
    setLoggedInUser({
      userId,
      username,
      password
    });
  };
  return (
    <UserContext.Provider value={{ loggedInUser, updateLoggedInUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
