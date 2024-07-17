import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import moment from "moment";
import DeleteBorrower from "../../component/DeleteBorrower";
import LendingContext from "../../context/LendingContext";
import { loanReducer, initialStateLoans } from "../../reducers/loanReducer";
import {
  paymentReducer,
  initialStatePayments
} from "../../reducers/paymentReducer";

const BorrowerById = () => {
  const [borrower, setBorrower] = useState({});
  const [borrowerDummy, setBorrowerDummy] = useState({});
  const { borrowerId } = useParams();
  const [showDiv, setShowDiv] = useState(false);
  const [showSaveSuccessfully, setSaveSuccessfully] = useState(false);
  const { error, setError } = useContext(LendingContext);
  const [imageFile, setImageFile] = useState("");
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(loanReducer, initialStateLoans);
  const [statePayments, dispatchPayments] = useReducer(
    paymentReducer,
    initialStatePayments
  );
  const [fnameError, setFnameError] = useState("");
  const [mnameError, setMnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [loan, setLoan] = useState({
    borrowerId: borrowerId,
    amountLoaned: "5000",
    durationMonth: "1",
    interestMonthly: "5",
    purpose: "",
    dateApplied: new Date().toISOString().split("T")[0]
  });
  const [payment, setPayment] = useState({
    borrowerId: borrowerId,
    amountReceived: "",
    dateReceived: new Date().toISOString().split("T")[0]
  });
  const [showAddLoan, setShowAddLoan] = useState(false);
  const [showLoanSuccessfully, setShowLoanSuccessfully] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showPaymentSuccessfully, setShowPaymentSuccessfully] = useState(false);

  // regex for name, allowed alphabet charactes, hypen, apostrophe, or period
  let nameRegex = /^[a-zA-Z0-9\s\-'.]+$/;
  // regex for email, ensures that the email address contains a local part, an '@' symbol, and a domain part separated by a dot. And no whitespace characters in email address
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // regex for contact number, allows for various common formats of phone numbers, including those with country codes, area codes, and different separators that are parentheses, whitespace, and hypens.
  let contactRegex = /^\+?[0-9\s\-()]+$/;
  // regex for location, allowed alphabet charactes, hypen, apostrophe, or period
  let locationRegex = /^[a-zA-Z0-9\s\-'.]+$/;

  const loansList = state.loans.map((loan) => {
    return (
      <tr key={loan._id}>
        <td className="py-2 px-1 sm:px-2 md:px-4 ">
          {moment(loan.dateApplied).format("MMMM DD YYYY")}
        </td>
        <td className="py-2 px-1 sm:px-2 md:px-4 ">
          {parseFloat(loan.amountLoaned).toFixed(2)}
        </td>
        <td className="py-2 px-1 sm:px-2 md:px-4 ">{loan.purpose}</td>
        <td className="py-2 px-1 sm:px-2 md:px-4 ">
          <div className="info-input">
            <button
              className="info-submit text-sm sm:text-base md:text-lg"
              onClick={() => handleDeleteLoan(loan._id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  const paymentsList = statePayments.payments.map((payment) => {
    return (
      <tr key={payment._id}>
        <td className="py-2 px-1 sm:px-2 md:px-4">
          {moment(payment.dateReceived).format("MMMM DD YYYY")}
        </td>
        <td className="py-2 px-1 sm:px-2 md:px-4 ">
          {parseFloat(payment.amountReceived).toFixed(2)}
        </td>
        <td className="py-2 px-1 sm:px-2 md:px-4 ">
          <div className="info-input">
            <button
              className="info-submit text-sm sm:text-base md:text-lg"
              onClick={() => handleDeletePayment(payment._id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    (async () => {
      const {
        data: { data }
      } = await axios.get(
        `http://localhost:8080/api/v1/borrowers/${borrowerId}`
      );
      setBorrower(data.borrower);
      setBorrowerDummy(
        data.borrower || {
          firstName: "",
          middleName: "",
          lastName: "",
          birthdate: "",
          homeAddress: "",
          contactNumber: "",
          photoId: { path: "", filename: "" },
          email: ""
        }
      );
      localStorage.setItem("loans", JSON.stringify(data.loans));
      localStorage.setItem("payments", JSON.stringify(data.payments));
      dispatch({ type: "LOANS_LIST", payload: data.loans });
      dispatchPayments({ type: "PAYMENTS_LIST", payload: data.payments });
    })();
  }, [borrowerId, state.loans.length, statePayments.payments.length]);

  const handleDeleteLoan = async (loanId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/loans/${loanId}`);
      dispatch({ type: "LOANS_DELETE", payload: loanId });
    } catch (error) {
      console.error("Failed to delete loan:", error);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/payments/${paymentId}`);
      dispatchPayments({ type: "PAYMENTS_DELETE", payload: paymentId });
    } catch (error) {
      console.error("Failed to delete payment:", error);
    }
  };

  const handleSave = async (e) => {
    try {
      e.preventDefault();

      setFnameError(
        borrowerDummy.firstName.match(nameRegex) !== null
          ? ""
          : "The name should consist of letters; hyphens, apostrophes, and periods are also acceptable."
      );

      setMnameError(
        borrowerDummy.middleName.match(nameRegex) !== null
          ? ""
          : "The name should consist of letters; hyphens, apostrophes, and periods are also acceptable."
      );

      setLnameError(
        borrowerDummy.lastName.match(nameRegex) !== null
          ? ""
          : "The name should consist of letters; hyphens, apostrophes, and periods are also acceptable."
      );

      setEmailError(
        borrowerDummy.email.match(emailRegex) !== null
          ? ""
          : "The email address should include a local part, followed by an '@' symbol, and then a domain part separated by a dot."
      );

      setContactError(
        borrowerDummy.contactNumber.match(contactRegex) !== null
          ? ""
          : "Phone numbers should have numbers with or without the plus sign and different separators such as whitespace, hypen, and parentheses"
      );

      setLocationError(
        borrowerDummy.homeAddress.match(locationRegex) !== null
          ? ""
          : "The location should consist of letters; numbers, hyphens, apostrophes, and periods are also acceptable."
      );

      if (
        borrowerDummy.firstName.match(nameRegex) !== null &&
        borrowerDummy.middleName.match(nameRegex) !== null &&
        borrowerDummy.lastName.match(nameRegex) !== null &&
        borrowerDummy.homeAddress.match(locationRegex) !== null &&
        borrowerDummy.email.match(emailRegex) !== null &&
        borrowerDummy.contactNumber.match(contactRegex) !== null
      ) {
        const editedData = new FormData();
        editedData.append("firstName", borrowerDummy.firstName);
        editedData.append("middleName", borrowerDummy.middleName);
        editedData.append("lastName", borrowerDummy.lastName);
        editedData.append("birthdate", borrowerDummy.birthdate);
        editedData.append("homeAddress", borrowerDummy.homeAddress);
        editedData.append("contactNumber", borrowerDummy.contactNumber);
        editedData.append("email", borrowerDummy.email);
        if (imageFile) {
          editedData.append("borrower-image", imageFile);
        }
        const editedBorrower = await axios.put(
          `http://localhost:8080/api/v1/borrowers/${borrowerId}`,
          editedData
        );
        // const newBorrower = await axios.post(
        //   "http://localhost:8080/api/v1/borrowers/register",
        //   data,
        //   { headers: { Authorization: `Bearer ${accessToken}` } }
        // );
        // // console.log(newBorrower);
        // // setBorrowers([newBorrower, ...borrowers]);
        dispatch({ type: "BORROWER_EDIT", payload: editedBorrower });
        // displayPopUp();
        // setError("");
        setError("");
        setFnameError("");
        setMnameError("");
        setLnameError("");
        setEmailError("");
        setLocationError("");
        setContactError("");
        setSaveSuccessfully(true);
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const handleAddLoan = async (e) => {
    try {
      e.preventDefault();
      const newLoan = await axios.post(
        "http://localhost:8080/api/v1/loans/apply",
        loan
      );
      dispatch({ type: "LOANS_ADD", payload: newLoan });
      setError("");
      setShowLoanSuccessfully(true);
      setLoan({
        borrowerId: borrowerId,
        amountLoaned: "5000",
        durationMonth: "1",
        interestMonthly: "5",
        purpose: "",
        dateApplied: new Date().toISOString().split("T")[0]
      });
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const handleAddPayment = async (e) => {
    try {
      e.preventDefault();
      const newPayment = await axios.post(
        "http://localhost:8080/api/v1/payments/pay",
        payment
      );
      dispatchPayments({ type: "PAYMENTS_ADD", payload: newPayment });
      setError("");
      setShowPaymentSuccessfully(true);
      setPayment({
        borrowerId: borrowerId,
        amountRecieved: "",
        dateReceived: new Date().toISOString().split("T")[0]
      });
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const handleBackToBorrower = (e) => {
    e.preventDefault();
    setSaveSuccessfully(false);
    setShowDiv(false);
    navigate("/borrowers");
  };
  const handleBack = (e) => {
    e.preventDefault();
    setShowLoanSuccessfully(false);
    setShowPaymentSuccessfully(false);
    setShowAddLoan(false);
    setShowAddPayment(false);
  };

  return (
    <>
      <h1 className="intro-message text-secondary-100">
        Borrower's Information
      </h1>
      <div className="flex flex-col items-center justify-center font-body">
        {borrower ? (
          <div className="px-8 pt-6 text-primary text-2xl leading-relaxed">
            <div className="flex-shrink-0">
              <img
                className=" w-44 h-44 rounded-3xl mx-auto mb-6"
                src={borrower.photoId?.path}
                alt={borrower._id}
              />
            </div>
            <h3>
              Name:
              <span className="font-bold pl-2">
                {borrower.firstName +
                  " " +
                  borrower.middleName +
                  " " +
                  borrower.lastName}
              </span>
            </h3>
            <p>
              Birth Date:
              <span className="font-bold pl-2">
                {moment(borrower.birthdate).format("MMMM Do YYYY")}
              </span>
            </p>
            <p>
              Home Address:
              <span className="font-bold pl-2">{borrower.homeAddress}</span>
            </p>
            <p>
              Contact Number:
              <span className="font-bold pl-2">{borrower.contactNumber}</span>
            </p>
            <p>
              Email:
              <span className="font-bold pl-2">{borrower.email}</span>
            </p>
            <p>
              Registered Date:
              <span className="font-bold pl-2">
                {moment(borrower.createdAt).format("MMMM Do YYYY")}
              </span>
            </p>
          </div>
        ) : (
          <p className="flex justify-center  text-secondary-100 italic">
            No Borrower Found
          </p>
        )}
      </div>
      <div className="flex flex-row justify-center mt-4">
        <div className="flex flex-row justify-around max-w-md w-full">
          <DeleteBorrower
            borrowerId={borrowerId}
            imageFilename={borrower.photoId?.filename}
          />
          {/* <EditBorrower /> */}
          <div className="info-input">
            <button className="info-submit" onClick={(e) => setShowDiv(true)}>
              Edit Borrower
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <table className="w-ful text-sm sm:text-base md:text-2xl text-primary max-w-xl border-collapse border-4 border-secondary-100 p-2 mt-4">
          <caption className="font-bold my-4">Loan History</caption>
          <thead>
            <tr>
              <th className="py-2 px-1 sm:px-2 md:px-4 text-left">Date:</th>
              <th className="py-2 px-1 sm:px-2 md:px-4 text-left">Amount:</th>
              <th className="py-2 px-1 sm:px-2 md:px-4 text-left">Purpose:</th>
            </tr>
          </thead>
          <tbody>
            {loansList}
            <>
              <tr>
                <th className="py-2 px-1 sm:px-2 md:px-4 text-center">
                  Total Loan:{" "}
                </th>
                <th className="py-2 px-1 sm:px-2 md:px-4 text-left">
                  {state.loans
                    .reduce(
                      (total, loan) => total + parseFloat(loan.amountLoaned),
                      0
                    )
                    .toFixed(2)}
                </th>
                <th></th>
              </tr>
              <tr>
                <td colSpan="4" className="py-2 px-1 sm:px-2 md:px-4">
                  {" "}
                  <div className="info-input pt-0">
                    <button
                      className="info-submit"
                      onClick={(e) => setShowAddLoan(true)}
                    >
                      Add Loan
                    </button>
                  </div>
                </td>
              </tr>
            </>
          </tbody>
        </table>
      </div>

      {showAddLoan && (
        <div className="modal">
          <div className="modal-content bg-gray-500">
            <main className="flex flex-col items-center justify-center font-body">
              <form
                onSubmit={handleAddLoan}
                className="form-container px-8 pt-6 pb-8 mb-4"
              >
                <div className="info-input">
                  <label className="info" htmlFor="loan">
                    Loan Amount (₱):
                  </label>
                  <select
                    className="info-login"
                    id="loan"
                    value={loan.amountLoaned}
                    onChange={(e) =>
                      setLoan({ ...loan, amountLoaned: e.target.value })
                    }
                    required
                  >
                    <option value="5000">5000</option>
                    <option value="10000">10000</option>
                    <option value="15000">15000</option>
                    <option value="20000">20000</option>
                    <option value="25000">25000</option>
                  </select>
                </div>
                <div className="info-input">
                  <label className="info" htmlFor="month">
                    Duration (1-3 Months):
                  </label>
                  <select
                    className="info-login"
                    id="month"
                    value={loan.durationMonth}
                    onChange={(e) =>
                      setLoan({ ...loan, durationMonth: e.target.value })
                    }
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className="info-input">
                  <label className="info" htmlFor="interest">
                    Monthly Interest (5-10%):
                  </label>
                  <select
                    className="info-login"
                    id="interest"
                    value={loan.interestMonthly}
                    onChange={(e) =>
                      setLoan({ ...loan, interestMonthly: e.target.value })
                    }
                    required
                  >
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="info-input">
                  <label className="info" htmlFor="purpose">
                    Purpose:
                  </label>
                  <input
                    className="info-login"
                    type="text"
                    id="purpose"
                    name="purpose"
                    value={loan.purpose}
                    onChange={(e) =>
                      setLoan({
                        ...loan,
                        purpose: e.target.value
                      })
                    }
                    required
                  ></input>
                </div>
                <div className="info-input">
                  <label className="info" htmlFor="date-disburse">
                    Disbursement Date:
                  </label>
                  <input
                    className="info-login"
                    type="date"
                    id="date-disburse"
                    name="date-disburse"
                    value={loan.dateApplied}
                    onChange={(e) =>
                      setLoan({ ...loan, dateApplied: e.target.value })
                    }
                    required
                  ></input>
                </div>
                <div className="info-input">
                  <h3 className="info font-bold">
                    Total Loan Amount with Interest (₱):{" "}
                    <span className="underline">
                      {" "}
                      {(
                        parseFloat(loan.amountLoaned) *
                        (1 +
                          (parseFloat(loan.interestMonthly) *
                            parseFloat(loan.durationMonth)) /
                            100)
                      ).toFixed(2)}
                    </span>
                  </h3>
                  <p className="info">
                    Note: Simple Interest Formula = Loan Amount x ( 1 + (
                    Monthly Interest * Duration of Months ) )
                  </p>
                </div>
                <div className="info-input flex flex-row justify-around">
                  <button className="" type="submit">
                    Save
                  </button>
                  <button className="" onClick={(e) => setShowAddLoan(false)}>
                    Back
                  </button>
                </div>
                {error && (
                  <div className="info-error text-center">
                    Error Message: {error}
                  </div>
                )}
              </form>
            </main>
            {showLoanSuccessfully && (
              <div className="modal">
                <div className="modal-content max-w-64 w-full">
                  <h2 className="text-3xl font-bold pb-2 mb-2 border-b-4 border-secondary-200">
                    Success!
                  </h2>
                  <p className="text-xl mb-2">
                    New loan submitted successfully.
                  </p>
                  <button onClick={(e) => handleBack(e)}>Back</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <table className="w-ful text-sm sm:text-base md:text-2xl text-primary max-w-xl border-collapse border-4 border-secondary-100 p-2 mt-4">
          <caption className="font-bold my-4">Payment History</caption>
          <thead>
            <tr>
              <th className="py-2 px-1 sm:px-2 md:px-4 text-left">Date:</th>
              <th className="py-2 px-1 sm:px-2 md:px-4 text-left">Amount:</th>
            </tr>
          </thead>
          <tbody>
            {paymentsList}
            <>
              <tr>
                <th className="py-2 px-1 sm:px-2 md:px-4 text-center">
                  Total Payment:{" "}
                </th>
                <th className="py-2 px-1 sm:px-2 md:px-4 text-left">
                  {statePayments.payments
                    .reduce(
                      (total, payment) =>
                        total + parseFloat(payment.amountReceived),
                      0
                    )
                    .toFixed(2)}
                </th>
                <th></th>
              </tr>
              <tr>
                <td colSpan="3" className="py-2 px-1 sm:px-2 md:px-4">
                  {" "}
                  <div className="info-input pt-0">
                    <button
                      className="info-submit"
                      onClick={(e) => setShowAddPayment(true)}
                    >
                      Add Payment
                    </button>
                  </div>
                </td>
              </tr>
            </>
          </tbody>
        </table>
      </div>
      {showAddPayment && (
        <div className="modal">
          <div className="modal-content bg-gray-500">
            <main className="flex flex-col items-center justify-center font-body">
              <form
                onSubmit={handleAddPayment}
                className="form-container px-8 pt-6 pb-8 mb-4"
              >
                <div className="info-input">
                  <label className="info" htmlFor="loan">
                    Amount of Payment (₱):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="info-login"
                    id="payment"
                    value={payment.amountReceived}
                    onChange={(e) =>
                      setPayment({ ...payment, amountReceived: e.target.value })
                    }
                    required
                  ></input>
                </div>
                <div className="info-input">
                  <label className="info" htmlFor="date-paid">
                    Date received:
                  </label>
                  <input
                    className="info-login"
                    type="date"
                    id="date-paid"
                    name="date-paid"
                    value={payment.dateReceived}
                    onChange={(e) =>
                      setLoan({ ...payment, dateReceived: e.target.value })
                    }
                    required
                  ></input>
                </div>
                <div className="info-input flex flex-row justify-around">
                  <button className="" type="submit">
                    Save
                  </button>
                  <button
                    className=""
                    onClick={(e) => setShowAddPayment(false)}
                  >
                    Back
                  </button>
                </div>
                {error && (
                  <div className="info-error text-center">
                    Error Message: {error}
                  </div>
                )}
              </form>
            </main>
            {showPaymentSuccessfully && (
              <div className="modal">
                <div className="modal-content max-w-64 w-full">
                  <h2 className="text-3xl font-bold pb-2 mb-2 border-b-4 border-secondary-200">
                    Success!
                  </h2>
                  <p className="text-xl mb-2">
                    New payment received successfully.
                  </p>
                  <button onClick={(e) => handleBack(e)}>Back</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showDiv && (
        <div className="modal">
          <div className="modal-content bg-gray-500">
            <main className="flex flex-col items-center justify-center font-body">
              <form
                onSubmit={handleSave}
                className="form-container px-8 pt-6 pb-8 mb-4"
              >
                <div className="info-input">
                  <label className="info" htmlFor="fname">
                    First Name:
                  </label>
                  <input
                    className="info-login"
                    type="text"
                    id="fname"
                    name="fname"
                    value={borrowerDummy.firstName}
                    onChange={(e) =>
                      setBorrowerDummy({
                        ...borrowerDummy,
                        firstName: e.target.value
                      })
                    }
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
                    value={borrowerDummy.middleName}
                    onChange={(e) =>
                      setBorrowerDummy({
                        ...borrowerDummy,
                        middleName: e.target.value
                      })
                    }
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
                    value={borrowerDummy.lastName}
                    onChange={(e) =>
                      setBorrowerDummy({
                        ...borrowerDummy,
                        lastName: e.target.value
                      })
                    }
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
                    value={moment(borrowerDummy.birthdate).format("YYYY-MM-DD")}
                    onChange={(e) =>
                      setBorrowerDummy({
                        ...borrowerDummy,
                        birthdate: e.target.value
                      })
                    }
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
                    value={borrowerDummy.homeAddress}
                    onChange={(e) =>
                      setBorrowerDummy({
                        ...borrowerDummy,
                        homeAddress: e.target.value
                      })
                    }
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
                    value={borrowerDummy.contactNumber}
                    onChange={(e) =>
                      setBorrowerDummy({
                        ...borrowerDummy,
                        contactNumber: e.target.value
                      })
                    }
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
                    value={borrowerDummy.email}
                    onChange={(e) =>
                      setBorrowerDummy({
                        ...borrowerDummy,
                        email: e.target.value
                      })
                    }
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
                <div className="info-input flex flex-row justify-around">
                  <button className="" type="submit">
                    Save
                  </button>
                  <button className="" onClick={(e) => setShowDiv(false)}>
                    Back
                  </button>
                </div>{" "}
                {error && (
                  <div className="info-error text-center">
                    Error Message: {error}
                  </div>
                )}
              </form>
            </main>
            {showSaveSuccessfully && (
              <div className="modal">
                <div className="modal-content max-w-64 w-full">
                  <h2 className="text-3xl font-bold pb-2 mb-2 border-b-4 border-secondary-200">
                    Success!
                  </h2>
                  <p className="text-xl mb-2">Borrower edited successfully.</p>
                  <button onClick={(e) => handleBackToBorrower(e)}>Back</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BorrowerById;
