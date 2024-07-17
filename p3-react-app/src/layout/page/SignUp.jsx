import { useContext, useEffect, useRef, useState } from "react";
import LendingContext from "../../context/LendingContext";
import axios from "axios";
import useLogin from "../../hooks/useLogin";

const SignUp = () => {
  const { invalidLogin, setInvalidLogin, setError } =
    useContext(LendingContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, login] = useLogin();

  // regex for name, allowed alphabet charactes, hypen, apostrophe, digit or period
  let usernameRegex = /^[a-zA-Z0-9\s\-'.]+$/;

  // regex for email, ensures that the email address contains a local part, an '@' symbol, and a domain part separated by a dot. And no whitespace characters in email address
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // regex for password, at least 8 characters long.
  let passwordRegex = /^.{8,}$/;

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setEmailError(
        email.match(emailRegex) !== null
          ? ""
          : "The email address should include a local part, followed by an '@' symbol, and then a domain part separated by a dot."
      );

      setPasswordError(
        password.match(passwordRegex) !== null
          ? ""
          : "Password should at least 8 characters long"
      );

      setUsernameError(
        username.match(usernameRegex) !== null
          ? ""
          : "The name should consist of letters; numbers, hyphens, apostrophes, and periods are also acceptable."
      );

      if (
        email.match(emailRegex) !== null &&
        password.match(passwordRegex) !== null &&
        username.match(usernameRegex) !== null
      ) {
        await axios.post(
          "https://lending-app-api.vercel.app/api/v1/users/register",
          {
            username,
            email,
            password
          }
        );
        login(e, { email, password });
      } else {
        setInvalidLogin(
          "Username, email and password should meet the minimum requirements."
        );
        setError("");
      }
    } catch (error) {
      console.error(error.message);
      setInvalidLogin("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      <h1 className="intro-message text-secondary-100">Sign Up</h1>
      <main className="flex flex-col items-center justify-center font-body">
        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 w-full">
          <div className="info-input">
            <label className="info" htmlFor="username">
              Username:
            </label>
            <input
              className="info-login"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={inputRef}
              required
            ></input>
            <div className="info-error">{usernameError}</div>
          </div>
          <div className="info-input">
            <label className="info" htmlFor="email">
              Email:
            </label>
            <input
              className="info-login"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <div className="info-error">{emailError}</div>
          </div>
          <div className="info-input">
            <label className="info" htmlFor="password">
              Password:
            </label>
            <input
              className="info-login"
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <div className="info-error">{passwordError}</div>
          </div>
          <div className="info-input">
            <input className="info-submit" type="submit" value="Submit"></input>
            {invalidLogin && (
              <div className="info-error text-center">{invalidLogin}</div>
            )}
            {error && <div className="info-error text-center">{error}</div>}
          </div>
        </form>
      </main>
    </>
  );
};
export default SignUp;
