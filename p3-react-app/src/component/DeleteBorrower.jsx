import { useNavigate } from "react-router-dom";
import { borrowerReducer, initialState } from "../reducers/borrowerReducer";
import { useReducer } from "react";
import axios from "axios";

const DeleteBorrower = ({ borrowerId, imageFilename }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(borrowerReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      await axios.delete(
        `https://lending-app-api.vercel.app/api/v1/borrowers/${borrowerId}/${
          imageFilename.split("/")[1]
        }`
      );
      dispatch({ type: "BORROWERS_DELETE", payload: borrowerId });
    })();

    navigate("/borrowers");
  };

  return (
    <div className="info-input">
      <button className="info-submit" onClick={(e) => handleSubmit(e)}>
        Delete Borrower
      </button>
    </div>
  );
};

export default DeleteBorrower;
