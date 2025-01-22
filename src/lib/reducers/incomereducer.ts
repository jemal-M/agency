 import { Income } from "@/types/income";
import { PaginationInfo } from "@/types/pagination";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
export interface IncomeState {
  Income: Income|null; // Array of Income data
  Incomes: Income[]; // Array of Income data
  error: any | null;
  status: 'Loading' | 'Success' | 'Failed'; // Handling the loading, success, and failure states
  incomeCreated:any|null,
  currentPage: number,
    totalPages:number,
    totalCount:number,
    limit:number,
}
 


// Define the initial state with correct properties
const initialIncomeState: IncomeState = {
  Income: null, // Initial empty array for Incomes
  Incomes:[],
  error: null,    // No error initially
  status: 'Loading', // Initially in loading state
  incomeCreated:null,
  
    currentPage: 1,
    totalPages:1,
    totalCount:0,
    limit:10,
  
};

export const incomeSlice = createSlice({
  name: "incomeSlice",
  initialState: initialIncomeState,
  reducers: {
    // Request to register a Income (Success case)
    registerIncomeRequest: (state, action: PayloadAction<Income>) => {
      state.Income = action.payload; // Update the Income data
      state.status = 'Loading'; // Explicitly mark the status as Success after successful registration
      state.error = null; // Clear previous errors if the registration is successful
    },

    // Request failed (Error handling)
    registerIncomeFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload; // Set the error if the request fails
      state.status = 'Failed'; // Explicitly set the status to Failed
      state.Income=null
   state.incomeCreated=null

    },
    
    // Explicit Success action for Income registration
    registerIncomeSuccess: (state,action) => {
      state.status = 'Success'; // Set status to Success
      state.error = null; // Clear any existing errors
   state.incomeCreated=action.payload
    },


        // Request to register a Income (Success case)
        fetchIncomeRequest: (state,action:PayloadAction<any>) => {
          state.status = 'Loading'; // Explicitly mark the status as Success after successful registration
          state.error = null; // Clear previous errors if the registration is successful
          state.Income=action.payload;
          state.currentPage=action.payload

        },
    
        // Request failed (Error handling)
        fetchIncomeFailure: (state, action: PayloadAction<Income[]>) => {
          state.error = action.payload; // Set the error if the request fails
          state.status = 'Failed'; // Explicitly set the status to Failed
        },
        
        // Explicit Success action for Income registration
        fetchIncomeSuccess: (state,action) => {
          state.status = 'Success'; // Set status to Success
          state.error = null; // Clear any existing errors
          state.Incomes=action.payload.incomes
          state.currentPage=action.payload.pagination.currentPage
          state.totalCount=action.payload.pagination.totalCount
          state.totalPages=action.payload.pagination.totalPages
          state.incomeCreated=null
        },
    // Reset state to initial (Loading state)
    reregisterIncomeState: (state) => {
      state.Income = null;
      state.incomeCreated=null
      state.error = null;
      state.status = 'Loading'; // Reset to loading state when initializing the form or on certain actions
    },

  },
});

// Export actions and reducer
export const {
  registerIncomeRequest,
  registerIncomeFailure,
  reregisterIncomeState,
  registerIncomeSuccess,
  fetchIncomeRequest,
  fetchIncomeFailure,
  fetchIncomeSuccess
} = incomeSlice.actions;

export default incomeSlice.reducer;
