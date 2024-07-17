import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import LendingContext from "../context/LendingContext";

const useLogin = () => {
  const {
    setIsLoggedIn,
    setUser,
    setLogName,
    setInvalidLogin,
    error,
    setError
  } = useContext(LendingContext);
  const navigate = useNavigate();
  const handleLogin = async (e, userCredentials) => {
    try {
      e.preventDefault();
      const {
        data: { data }
      } = await axios.post("http://localhost:8080/api/v1/users/login", {
        email: userCredentials.email,
        password: userCredentials.password
      });
      setInvalidLogin("");
      console.log(data);
      setIsLoggedIn(true);
      setLogName(data.username);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/");
      setError("");
    } catch (error) {
      console.error(error.message);
      setInvalidLogin("");
      setError(error.response.data.message);
    }
  };

  return [error, handleLogin];
};

export default useLogin;
