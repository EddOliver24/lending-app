import { useContext } from "react";
import LendingContext from "../../context/LendingContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setLogName } = useContext(LendingContext);
  const handleLogOut = (e) => {
    setIsLoggedIn(false);
    setLogName("");
    localStorage.clear();
    navigate("/home");
  };

  return (
    <>
      <h1 className="intro-message text-secondary-100 mb-10">Logout Page</h1>
      <p className="flex justify-center text-secondary-100 italic mb-4">
        Are you sure want to logout?
      </p>
      <div className="info-input">
        <button className="info-submit" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
