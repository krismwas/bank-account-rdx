import { combineReducers, createStore } from "redux";

const initialStateAccount = { loan: 0, balance: 0, loanPurpose: "" };

const initialStateCustomer = { fullName: "", nationID: "", createAt: "" };

function accountReducer(state = initialStateAccount, action) {
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

const rootReducer = combineReducers({
  customer: customerReducer,
  account: accountReducer,
});

const store = createStore(rootReducer);

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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payLoad.fullName,
        nationID: action.payLoad.nationID,
        createAt: action.payLoad.createAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payLoad };
    default:
      return state;
  }
}

function createCustomer(fullName, nationID) {
  return {
    type: "customer/createCustomer",
    payLoad: { fullName, nationID, createAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payLoad: fullName };
}

store.dispatch(createCustomer("margaret", 33));
console.log(store.getState());

store.dispatch(updateName("margaret njambi"));
console.log(store.getState());
