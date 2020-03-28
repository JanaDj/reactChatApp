import React from "react";
import styles from "../../styles/LoginPageStyle.module.css";

function LoginForm({ user, onChange }) {
  return (
    <form className="col s12">
      <div className="row">
        <div className="input-field col s6">
          <input
            type="text"
            data-length="10"
            placeholder="username"
            name="username"
            value={user.username}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <input
            type="text"
            data-length="10"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={onChange}
          />
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
