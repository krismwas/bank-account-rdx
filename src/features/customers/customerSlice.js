const initialStateCustomer = { fullName: "", nationID: "", createAt: "" };

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationID: action.payload.nationID,
        createAt: action.payload.createAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payLoad };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationID, createAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payLoad: fullName };
}
