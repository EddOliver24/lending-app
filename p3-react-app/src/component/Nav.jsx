import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import LendingContext from "../context/LendingContext";

const Nav = () => {
  const { isLoggedIn } = useContext(LendingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={`nav-container`}>
      <Link to="/home" className="nav text-secondary-100 font-bold">
        Micro-Scale Lending App
      </Link>
      <div
        className="px-4 cursor-pointer md:hidden ml-auto"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 bg-secondary-200 rounded mr-0 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      {isLoggedIn ? (
        <>
          <div className="hidden md:block ">
            <Link to="/home" className="nav hover:text-secondary-100">
              Home
            </Link>
            <Link to="/borrowers" className="nav hover:text-secondary-100">
              Borrowers
            </Link>
            <Link to="/enrollment" className="nav hover:text-secondary-100">
              Enrollment
            </Link>
            <Link to="/about" className="nav hover:text-secondary-100">
              About
            </Link>
            <Link to="/logout" className="nav hover:text-secondary-100">
              Logout
            </Link>
          </div>
          <div
            className={`md:hidden flex flex-col ml-0 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <Link to="/home" className="nav hover:text-secondary-100">
              Home
            </Link>
            <Link to="/borrowers" className="nav hover:text-secondary-100">
              Borrowers
            </Link>
            <Link to="/enrollment" className="nav hover:text-secondary-100">
              Enrollment
            </Link>
            <Link to="/about" className="nav hover:text-secondary-100">
              About
            </Link>
            <Link to="/logout" className="nav hover:text-secondary-100">
              Logout
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="hidden md:block">
            <Link to="/home" className="nav hover:text-secondary-100">
              Home
            </Link>
            <Link to="/about" className="nav hover:text-secondary-100">
              About
            </Link>
            <Link to="/login" className="nav hover:text-secondary-100">
              Login
            </Link>
            <Link to="/signup" className="nav hover:text-secondary-100">
              Sign-up
            </Link>
          </div>
          <div
            className={`md:hidden flex flex-col ml-0 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <Link to="/home" className="nav hover:text-secondary-100">
              Home
            </Link>
            <Link to="/about" className="nav hover:text-secondary-100">
              About
            </Link>
            <Link to="/login" className="nav hover:text-secondary-100">
              Login
            </Link>
            <Link to="/signup" className="nav hover:text-secondary-100">
              Sign-up
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
