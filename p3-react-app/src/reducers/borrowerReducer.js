const initialState = {
  borrowers: localStorage.getItem("borrowers")
    ? JSON.parse(localStorage.getItem("borrowers"))
    : [],
};

const borrowerReducer = (state, action) => {
  switch (action.type) {
    case "BORROWERS_LIST":
      return { ...state, borrowers: action.payload };
    case "BORROWER_ADD":
      return { ...state, borrowers: [action.payload, ...state.borrowers] };
    case "BORROWER_DELETE":
      return {
        ...state,
        borrowers: state.borrowers.filter(
          (borrower) => borrower._id !== action.payload
        ),
      };
    case "BORROWER_EDIT":
      return {
        ...state,
        borrowers: state.borrowers.map((borrower) =>
          borrower._id === action.payload._id ? action.payload : borrower
        ),
      };
    default:
      return state;
  }
};

export { initialState, borrowerReducer };
