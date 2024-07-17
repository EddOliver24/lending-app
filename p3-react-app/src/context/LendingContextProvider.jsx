import { useState } from "react";
import LendingContext from "./LendingContext";

const LendingContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );
  const [logName, setLogName] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState("");
  const [error, setError] = useState("");
  const displayPopUp = () => {
    setShowDiv((prev) => !prev);
  };

  return (
    <LendingContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        logName,
        setLogName,
        showDiv,
        displayPopUp,
        invalidLogin,
        setInvalidLogin,
        error,
        setError
      }}
    >
      {children}
    </LendingContext.Provider>
  );
};

export default LendingContextProvider;
