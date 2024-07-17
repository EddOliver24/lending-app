import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="info-input">
      <button className="info-submit" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
};

export default BackButton;
