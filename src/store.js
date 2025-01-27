import { createStore } from "redux";

const initialState = { loan: 0, balance: 0, loanPurpose: "" };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

store.dispatch(deposit(1000));
console.log(store.getState());

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
store.dispatch(withdraw(300));
console.log(store.getState());

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

store.dispatch(requestLoan(2000, "buy a car"));
console.log(store.getState());
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(payLoan());
console.log(store.getState());
