import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
export interface UserState {
  userData: User|null;  
  users: User[]|[];  
  userRegistered:any|null;
  error: any | null;
  status: 'Loading' | 'Success' | 'Failed'|'Ideal'; // Handling the loading, success, and failure states
  currentPage: number,
  totalPages:number,
  totalCount:number,
  limit:number,
}

// Define the initial state with correct properties
const initialUserState: UserState = {
    userData: null, 
    userRegistered:null,
    users:[],
  error: null,    // No error initially
  status: 'Ideal', // Initially in loading state
  currentPage: 1,
  totalPages:1,
  totalCount:0,
  limit:10,
};

export const registerUser = createSlice({
  name: "registerUser",
  initialState: initialUserState,
  reducers: {
    // Request to login a candidate (Success case)
  // In your registerUser reducer:
registerUserRequest: (state, action: PayloadAction<User>) => {
  state.status = 'Loading';  // Ensure it's loading before sending request
  state.error = null;
},
registerUserSuccess: (state,action) => {
  state.status = 'Success';  // After successful registerUser
  state.error = null;
  state.userRegistered=action.payload
},
registerUserFailure: (state, action: PayloadAction<any>) => {
  state.status = 'Failed';  // If login fails
  state.error = action.payload;
  state.userRegistered=null

},


fetchUserRequest: (state,action:PayloadAction<any>) => {
  state.status = 'Loading';  // Ensure it's loading before sending request
  state.error = null;
},
fetchUserSuccess: (state,action) => {
  state.status = 'Success';  // After successful fetchUser
  state.error = null;
  state.users=action.payload.user;
  state.currentPage=action.payload.pagination.currentPage
  state.totalCount=action.payload.pagination.totalCount
  state.totalPages=action.payload.pagination.totalPages
},
fetchUserFailure: (state, action: PayloadAction<any>) => {
  state.status = 'Failed';  // If login fails
  state.error = action.payload;

},
    resetUserRegistration: (state) => {
      state.userData = null;
      state.error = null;
  state.userRegistered=null

      state.status = 'Ideal'; // Reset to loading state when initializing the form or on certain actions
    },

  },
});

// Export actions and reducer
export const {
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
  resetUserRegistration,
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess
   
} = registerUser.actions;

export default registerUser.reducer;
