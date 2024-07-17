import { useContext, useRef, useEffect, useState } from "react";
import LendingContext from "../../context/LendingContext";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { setError } = useContext(LendingContext);
  const [invalidLogin, setInvalidLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, login] = useLogin();

  const userCredentials = {
    email,
    password
  };

  // regex for email, ensures that the email address contains a local part, an '@' symbol, and a domain part separated by a dot. And no whitespace characters in email address
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // regex for password, at least 8 characters long.
  let passwordRegex = /^.{8,}$/;

  const handleSubmit = async (e) => {
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

    if (
      email.match(emailRegex) !== null &&
      password.match(passwordRegex) !== null
    ) {
      login(e, userCredentials);
    } else {
      setInvalidLogin(
        "Email and password should meet the minimum requirements."
      );
      setError("");
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <h1 className="intro-message text-secondary-100">Login</h1>
      <main className="flex flex-col items-center justify-center font-body ">
        <form
          onSubmit={(e) => handleSubmit(e, userCredentials)}
          className="px-8 pt-6 pb-8 mb-4 w-full"
        >
          <div className="info-input">
            <label className="info" htmlFor="log-email">
              Email:{" "}
            </label>
            <input
              className="info-login"
              type="email"
              id="log-email"
              name="log-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={inputRef}
              required
            ></input>
            <div className="info-error">{emailError}</div>
          </div>
          <div className="info-input">
            <label className="info" htmlFor="log-password">
              Password:
            </label>
            <input
              className="info-login"
              type="password"
              id="log-password"
              name="log-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <div className="info-error">{passwordError}</div>
          </div>
          <div className="info-input ">
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

export default Login;
