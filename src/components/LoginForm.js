// eslint-disable-next-line no-unused-vars
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import FirebaseAuthService from "../FirebaseAuthService";

const LoginForm = ({ existingUser }) => {
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await FirebaseAuthService.loginUser(username, password);
      setUserame("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
  };

  const handleSendResetPasswordEmail = async () => {
    if (!username) {
      alert("Missing username!");
      return;
    }
    try {
      await FirebaseAuthService.sendResetPassword(username);
      alert("sent the password reset email");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await FirebaseAuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Welcome, {existingUser.email}</h3>
          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email) :
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUserame(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Password :
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button className="primary-butoon">Login</button>
            <button
              type="button"
              onClick={handleSendResetPasswordEmail}
              className="primary-button"
            >
              Reset Passord
            </button>
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="primary-button"
            >
              Login with Google
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
