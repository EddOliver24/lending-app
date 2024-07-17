import { useNavigate } from "react-router-dom";

const BackBorrower = () => {
  const navigate = useNavigate();

  return (
    <div className="info-input">
      <button className="info-submit" onClick={() => navigate("/borrowers")}>
        Back to Borrower
      </button>
    </div>
  );
};

export default BackBorrower;
