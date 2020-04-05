import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/LoginPageStyle.module.css";
import LoginForm from "./LoginForm";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

function LoginPage() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const { loggedInUser, updateLoggedInUser } = useContext(UserContext);
  let history = useHistory();
  /**
   * Function to handle input value change and update state
   * So that code is reusable, name of inputs will be the same as user properties
   * @param {event} target , input event function is passed to
   */
  function handleInputChange({ target }) {
    setUser({
      ...user,
      [target.name]: target.value
    });
  }

  //   register and sign in:
  useEffect(() => {});

  /**
   * Function to validate user credentials
   * function makes a post fetch request to the API to '/authenticate' endpoint
   * Based on the response, UI is updated
   */
  const validateUserCredentials = () => {
    if (user.username !== "" && user.password !== "") {
      fetch("http://127.0.0.1:3000/api/v1/auth/authenticate", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password
        })
      })
        .then(r => r.json().then(data => ({ status: r.status, data: data })))
        .then(object => {
          //  if response 200 redirect user to chat
          if (object.status === 200) {
            updateLoggedInUser(
              object.data.userId,
              object.data.username,
              object.data.password
            );
            history.push(`/chat`);
          }

          if (object.status === 400) {
            console.log("invalid user credentials");
            // handle UI for error
          }
        })
        .catch(error => {
          //  handle error
          console.log("error validating user", error);
        });
    } else {
      // handle required fields
    }
  };

  const registerUser = () => {
    if (user.username !== "" && user.password !== "") {
      fetch("http://127.0.0.1:3000/api/v1/auth/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password
        })
      })
        .then(r => r.json().then(data => ({ status: r.status, data: data })))
        .then(object => {
          //  if response 200 redirect user to chat
          if (object.status === 200 || object.status === 201) {
            updateLoggedInUser(
              object.data.userId,
              object.data.username,
              object.data.password
            );
            history.push("/chat");
          }

          if (object.status === 400) {
            console.log(
              "Username is already taken. Please try another username"
            );
            setUser({
              ...user,
              username: "",
              password: ""
            });
            // handle UI for error
          }
        })
        .catch(error => {
          //  handle error
          console.log("error validating user", error);
        });
    } else {
      // handle required fields
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <div className="card blue-grey">
          <div className="card-content white-text">
            <span className="card-title">Card Title</span>
            <LoginForm user={user} onChange={handleInputChange} />
          </div>
          <div className="card-action">
            {/* <Link
              onClick={e => (!user.username ? e.preventDefault() : null)}
              to={`/chat?name=${user.username}`}
            > */}
            <button className="btn blue" onClick={validateUserCredentials}>
              Sign In
            </button>
            {/* </Link> */}
            <button className="btn blue" onClick={registerUser}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
