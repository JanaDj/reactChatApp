import React from "react";
import { Route, Switch } from "react-router-dom";
import ChatPage from "./components/ChatPage/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";
import UserContextProvider from "./Context/UserContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/chat" component={ChatPage} />
          <Route path="/login" component={LoginPage} />
          {/* <Route component={PageNotFound} /> */}
        </Switch>
      </UserContextProvider>
    </div>
  );
}

export default App;
