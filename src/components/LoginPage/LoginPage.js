import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/LoginPageStyle.module.css";
import LoginForm from "./LoginForm";

function LoginPage() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });
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
  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <div className="card blue-grey">
          <div className="card-content white-text">
            <span className="card-title">Card Title</span>
            <LoginForm user={user} onChange={handleInputChange} />
          </div>
          <div className="card-action">
            <Link
              onClick={e => (!user.username ? e.preventDefault() : null)}
              to={`/chat?name=${user.username}`}
            >
              <button className="btn blue" type="submit">
                Sign In
              </button>
            </Link>
            <button className="btn blue">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
