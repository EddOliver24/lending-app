import { useEffect } from "react";
import LendingContext from "../../context/LendingContext";
import { useState, useContext, useRef, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { borrowerReducer, initialState } from "../../reducers/borrowerReducer";

const Enrollment = () => {
  const {
    user: { accessToken },
    showDiv,
    displayPopUp,
    error,
    setError
  } = useContext(LendingContext);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState("");
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(borrowerReducer, initialState);
  const [fnameError, setFnameError] = useState("");
  const [mnameError, setMnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [locationError, setLocationError] = useState("");

  // regex for name, allowed alphabet charactes, hypen, apostrophe, or period
  let nameRegex = /^[a-zA-Z0-9\s\-'.]+$/;
  // regex for email, ensures that the email address contains a local part, an '@' symbol, and a domain part separated by a dot. And no whitespace characters in email address
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // regex for contact number, allows for various common formats of phone numbers, including those with country codes, area codes, and different separators that are parentheses, whitespace, and hypens.
  let contactRegex = /^\+?[0-9\s\-()]+$/;
  // regex for location, allowed alphabet charactes, hypen, apostrophe, or period
  let locationRegex = /^[a-zA-Z0-9\s\-'.]+$/;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setFnameError(
        firstName.match(nameRegex) !== null
          ? ""
          : "The name should consist of letters; hyphens, apostrophes, and periods are also acceptable."
      );
      setMnameError(
        middleName.match(nameRegex) !== null
          ? ""
          : "The name should consist of letters; hyphens, apostrophes, and periods are also acceptable."
      );
      setLnameError(
        lastName.match(nameRegex) !== null
          ? ""
          : "The name should consist of letters; hyphens, apostrophes, and periods are also acceptable."
      );
      setEmailError(
        email.match(emailRegex) !== null
          ? ""
          : "The email address should include a local part, followed by an '@' symbol, and then a domain part separated by a dot."
      );
      setContactError(
        contactNumber.match(contactRegex) !== null
          ? ""
          : "Phone numbers should have numbers with or without the plus sign and different separators such as whitespace, hypen, and parentheses"
      );
      setLocationError(
        homeAddress.match(locationRegex) !== null
          ? ""
          : "The location should consist of letters; numbers, hyphens, apostrophes, and periods are also acceptable."
      );

      if (
        firstName.match(nameRegex) !== null &&
        lastName.match(nameRegex) !== null &&
        homeAddress.match(locationRegex) !== null &&
        email.match(emailRegex) !== null &&
        contactNumber.match(contactRegex) !== null
      ) {
        const data = new FormData();
        data.append("firstName", firstName);
        data.append("middleName", middleName);
        data.append("lastName", lastName);
        data.append("birthdate", birthdate);
        data.append("homeAddress", homeAddress);
        data.append("contactNumber", contactNumber);
        data.append("email", email);
        data.append("borrower-image", imageFile);

        const newBorrower = await axios.post(
          "https://lending-app-api.vercel.app/api/v1/borrowers/register",
          data,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        dispatch({ type: "BORROWER_ADD", payload: newBorrower });
        displayPopUp();
        setError("");
        setFnameError("");
        setMnameError("");
        setLnameError("");
        setEmailError("");
        setLocationError("");
        setContactError("");
      }
    } catch (error) {
      console.error(error.message);
      setError(error.response.data.message);
    }
  };

  const handleBackToBorrower = (e) => {
    e.preventDefault();
    displayPopUp();
    navigate("/borrowers");
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <h1 className="intro-message text-secondary-100">
        Enrollment of Borrower
      </h1>
      <main className="flex flex-col items-center justify-center font-body">
        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
          <div className="info-input">
            <label className="info" htmlFor="fname">
              First Name:
            </label>
            <input
              className="info-login"
              type="text"
              id="fname"
              name="fname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              ref={inputRef}
              required
            ></input>
            <div className="info-error">{fnameError}</div>
          </div>
          <div className="info-input">
            <label className="info" htmlFor="mname">
              Middle Name:
            </label>
            <input
              className="info-login"
              type="text"
              id="mname"
              name="mname"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              required
            ></input>
            <div className="info-error">{mnameError}</div>
          </div>
          <div className="info-input">
            <label className="info" htmlFor="lname">
              Last Name:
            </label>
            <input
              className="info-login"
              type="text"
              id="lname"
              name="lname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            ></input>
            <div className="info-error">{lnameError}</div>
          </div>
          <div className="info-input">
            <label className="info" htmlFor="birthdate">
              Birth Date:
            </label>
            <input
              className="info-login"
              type="date"
              id="birthdate"
              name="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            ></input>
          </div>
          <div className="info-input">
            <label className="info" htmlFor="home-address">
              Home Address:
            </label>
            <input
              className="info-login"
              type="text"
              id="home-address"
              name="home-address"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              required
            ></input>
            <div className="info-error">{locationError}</div>
          </div>
          <div className="info-input">
            <label className="info" htmlFor="contact-number">
              Contact Number:
            </label>
            <input
              className="info-login"
              type="text"
              id="contact-number"
              name="contact-number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            ></input>
            <div className="info-error">{contactError}</div>
          </div>
          <div className="info-input">
            <label className="info" htmlFor="email">
              Email:
            </label>
            <input
              className="info-login"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <div className="info-error">{emailError}</div>
          </div>
          <div className="info-input">
            <label className="info" htmlFor="photo">
              Photo:
            </label>
            <input
              className="info-login"
              type="file"
              id="photo"
              name="photo"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            ></input>
          </div>
          <div className="info-input">
            <input className="info-submit" type="submit" value="Submit"></input>
            {error && (
              <div className="info-error text-center">
                Error Message: {error}
              </div>
            )}
          </div>
        </form>
      </main>
      {showDiv && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-3xl font-bold pb-2 mb-2 border-b-4 border-secondary-200">
              Success!
            </h2>
            <p className="text-xl mb-2">Borrower enrolled successfully.</p>
            <button onClick={(e) => handleBackToBorrower(e)}>
              Back to Borrowers' List
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Enrollment;
