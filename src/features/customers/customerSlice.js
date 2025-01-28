import { createSlice } from "@reduxjs/toolkit";
import reducer from "../accounts/accountSlice";

const initialState = { fullName: "", nationID: "", createAt: "" };

const accountSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationID) {
        return {
          payload: { fullName, nationID, createAt: new Date().toISOString() },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationID = action.payload.nationID;
        state.createAt = action.payload.createAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

console.log(accountSlice);

export const { createCustomer, updateName } = accountSlice.actions;

export default accountSlice.reducer;
// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationID: action.payload.nationID,
//         createAt: action.payload.createAt,
//       };
//     case "customer/updateName":
//       return { ...state, fullName: action.payLoad };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationID) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationID, createAt: new Date().toISOString() },
//   };
// }

// export function updateName(fullName) {
//   return { type: "customer/updateName", payLoad: fullName };
// }
