import { useContext } from "react";
import LendingContext from "../../context/LendingContext";

const Home = () => {
  const { isLoggedIn, logName } = useContext(LendingContext);

  return (
    <>
      {isLoggedIn && (
        <h1 className="intro-message text-secondary-100">
          Hi! Lender {logName}
        </h1>
      )}
      {!isLoggedIn && (
        <h1 className="intro-message text-secondary-100">Home</h1>
      )}
      <h1 className="intro-message mt-10">
        This app is for educational purpose and serves as a tool for a
        micro-scale lending business.
      </h1>
      <h1 className="intro-message">
        The features of the app are solely focus on the lender as users.
      </h1>
    </>
  );
};

export default Home;
