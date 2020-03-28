import React from "react";
import { Route, Switch } from "react-router-dom";
import ChatPage from "./components/ChatPage/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route path="/chat" component={ChatPage} />
        <Route path="/login" component={LoginPage} />
        {/* <Route component={PageNotFound} /> */}
      </Switch>
    </div>
  );
}

export default App;
