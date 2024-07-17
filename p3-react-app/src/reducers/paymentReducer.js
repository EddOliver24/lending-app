const initialStatePayments = {
  payments: localStorage.getItem("payments")
    ? JSON.parse(localStorage.getItem("payments"))
    : []
};

const paymentReducer = (state, action) => {
  switch (action.type) {
    case "PAYMENTS_LIST":
      return { ...state, payments: action.payload };
    case "PAYMENTS_ADD":
      return { ...state, payments: [action.payload, ...state.payments] };
    case "PAYMENTS_DELETE":
      return {
        ...state,
        payments: state.payments.filter(
          (payment) => payment._id !== action.payload
        )
      };
    case "PAYMENTS_EDIT":
      return {
        ...state,
        payments: state.payments.map((payment) =>
          payment._id === action.payload._id ? action.payload : payment
        )
      };
    default:
      return state;
  }
};

export { initialStatePayments, paymentReducer };
