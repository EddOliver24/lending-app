import { useEffect, useReducer } from "react";
import axios from "axios";
import AddBorrowerForm from "../../component/AddBorrowerForm";
import Borrower from "./Borrower";
import { borrowerReducer, initialState } from "../../reducers/borrowerReducer";

const Borrowers = () => {
  const [state, dispatch] = useReducer(borrowerReducer, initialState);

  const BorrowersList = state.borrowers.map((borrower) => {
    return (
      <Borrower
        key={borrower._id}
        borrowerId={borrower._id}
        firstName={borrower.firstName}
        lastName={borrower.lastName}
        imageUrl={borrower.photoId.path}
        date={borrower.createdAt}
      ></Borrower>
    );
  });

  useEffect(() => {
    (async () => {
      const {
        data: { data }
      } = await axios.get("http://localhost:8080/api/v1/borrowers");

      localStorage.setItem("borrowers", JSON.stringify(data));
      dispatch({ type: "BORROWERS_LIST", payload: data });
    })();
  }, [state.borrowers.length]);

  return (
    <>
      <h1 className="intro-message text-secondary-100">List of Borrowers</h1>
      <div className="flex flex-col justify-center mx-auto w-3/4">
        <div className="flex flex-row text-secondary-200 p-4 justify-around">
          <div className="-ml-6 text-lg font-semibold text-center">Photo:</div>
          <div className="text-lg font-semibold">Name:</div>
          <div className="text-lg font-semibold">Date Registered:</div>
        </div>
        {BorrowersList ? (
          BorrowersList
        ) : (
          <p className="flex justify-center  text-secondary-100 italic">
            No Borrower Registered
          </p>
        )}
      </div>
      <AddBorrowerForm />
    </>
  );
};

export default Borrowers;
