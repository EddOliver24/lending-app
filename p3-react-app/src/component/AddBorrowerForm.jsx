import { useNavigate } from "react-router-dom";

const AddBorrowerForm = () => {
  const navigate = useNavigate();

  return (
    <div className="info-input">
      <button className="info-submit" onClick={() => navigate("/enrollment")}>
        Add Borrower
      </button>
    </div>
  );
};

export default AddBorrowerForm;
