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
        `http://localhost:8080/api/v1/borrowers/${borrowerId}/${
          imageFilename.split("/")[1]
        }`
      );
      dispatch({ type: "BORROWERS_DELETE", payload: borrowerId });
      //fetch data
      //   const {
      //     data: { data },
      //   } = await axios.get("http://localhost:8080/api/v1/borrowers");
      //   localStorage.setItem("borrowers", JSON.stringify(data));
      //   dispatch({ type: "BORROWERS_LIST", payload: data });
    })();

    // dispatch({ type: "BORROWERS_DELETE", payload: borrowerId });
    navigate("/borrowers");
  };

  return (
    <div className="info-input">
      {/* <button className="info-submit" onClick={() => navigate("/enrollment")}></button> */}
      <button className="info-submit" onClick={(e) => handleSubmit(e)}>
        Delete Borrower
      </button>
    </div>
  );
};

export default DeleteBorrower;
