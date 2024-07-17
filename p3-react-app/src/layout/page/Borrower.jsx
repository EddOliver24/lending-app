import moment from "moment";
import { Link } from "react-router-dom";

const Borrower = ({ firstName, lastName, imageUrl, date, borrowerId }) => {
  return (
    <Link to={`/borrowers/${borrowerId}`}>
      <div className="flex flex-row items-center justify-around text-primary m-2">
        <div className="flex-shrink-0">
          <img
            className="w-20 h-20 rounded-full"
            src={imageUrl}
            alt={lastName}
          />
        </div>
        <div className="text-lg font-semibold">
          {firstName + " " + lastName}
        </div>
        <div className="text-lg">
          {moment(date).format("MMMM Do YYYY, h:mm a")}
        </div>
      </div>
    </Link>
  );
};

export default Borrower;
