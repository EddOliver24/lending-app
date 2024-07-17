const initialStateLoans = {
  loans: localStorage.getItem("loans")
    ? JSON.parse(localStorage.getItem("loans"))
    : []
};

const loanReducer = (state, action) => {
  switch (action.type) {
    case "LOANS_LIST":
      return { ...state, loans: action.payload };
    case "LOANS_ADD":
      return { ...state, loans: [action.payload, ...state.loans] };
    case "LOANS_DELETE":
      return {
        ...state,
        loans: state.loans.filter((loan) => loan._id !== action.payload)
      };
    case "LOANS_EDIT":
      return {
        ...state,
        loans: state.loans.map((loan) =>
          loan._id === action.payload._id ? action.payload : loan
        )
      };
    default:
      return state;
  }
};

export { initialStateLoans, loanReducer };
