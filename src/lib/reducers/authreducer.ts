import { Login } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
export interface LoginState {
  loginUserData: Login|null; // Array of candidate data
  error: any | null;
  status: 'Loading' | 'Success' | 'Failed'|'Ideal'; // Handling the loading, success, and failure states
}

// Define the initial state with correct properties
const initialLoginState: LoginState = {
    loginUserData: null, // Initial empty array for candidates
  error: null,    // No error initially
  status: 'Ideal', // Initially in loading state
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialLoginState,
  reducers: {
    // Request to login a candidate (Success case)
  // In your authSlice reducer:
loginRequest: (state, action: PayloadAction<Login>) => {
  state.status = 'Loading';  // Ensure it's loading before sending request
  state.error = null;
},
loginSuccess: (state) => {
  state.status = 'Success';  // After successful login
  state.error = null;
},
loginFailure: (state, action: PayloadAction<any>) => {
  state.status = 'Failed';  // If login fails
  state.error = action.payload;
},

logoutRequest: (state) => {
  state.status = 'Loading';  // Ensure it's loading before sending request
  state.error = null;
},
logoutSuccess: (state) => {
  state.status = 'Success';  // After successful login
  state.error = null;
},
logoutFailure: (state, action: PayloadAction<any>) => {
  state.status = 'Failed';  // If login fails
  state.error = action.payload;
},
    // Reset state to initial (Loading state)
    resetloginState: (state) => {
      state.loginUserData = null;
      state.error = null;
      state.status = 'Ideal'; // Reset to loading state when initializing the form or on certain actions
    },

  },
});

// Export actions and reducer
export const {
  loginRequest,
  loginFailure,
  resetloginState,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  logoutRequest
   
} = authSlice.actions;

export default authSlice.reducer;
