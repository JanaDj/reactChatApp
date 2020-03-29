import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    // react router history
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: "id_token",
      scope: "openid"
    });
  }

  login = () => {
    this.auth0.authorize();
  };
}
