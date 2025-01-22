 import { Expense } from "@/types/expense";
import { PaginationInfo } from "@/types/pagination";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
export interface ExpenseState {
  Expense: Expense|null; // Array of Expense data
  Expenses: Expense[]; // Array of Expense data
  error: any | null;
  status: 'Loading' | 'Success' | 'Failed'; // Handling the loading, success, and failure states
  ExpenseCreated:any|null,
  currentPage: number,
    totalPages:number,
    totalCount:number,
    limit:number,
}
 


// Define the initial state with correct properties
const initialExpenseState: ExpenseState = {
  Expense: null, // Initial empty array for Expenses
  Expenses:[],
  error: null,    // No error initially
  status: 'Loading', // Initially in loading state
  ExpenseCreated:null,
  
    currentPage: 1,
    totalPages:1,
    totalCount:0,
    limit:10,
  
};

export const ExpenseSlice = createSlice({
  name: "ExpenseSlice",
  initialState: initialExpenseState,
  reducers: {
    // Request to register a Expense (Success case)
    registerExpenseRequest: (state, action: PayloadAction<Expense>) => {
      state.Expense = action.payload; // Update the Expense data
      state.status = 'Loading'; // Explicitly mark the status as Success after successful registration
      state.error = null; // Clear previous errors if the registration is successful
    },

    // Request failed (Error handling)
    registerExpenseFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload; // Set the error if the request fails
      state.status = 'Failed'; // Explicitly set the status to Failed
      state.Expense=null
    },
    
    // Explicit Success action for Expense registration
    registerExpenseSuccess: (state,action) => {
      state.status = 'Success'; // Set status to Success
      state.error = null; // Clear any existing errors
   state.ExpenseCreated=action.payload
    },


        // Request to register a Expense (Success case)
        fetchExpenseRequest: (state,action:PayloadAction<any>) => {
          state.status = 'Loading'; // Explicitly mark the status as Success after successful registration
          state.error = null; // Clear previous errors if the registration is successful
          state.Expense=action.payload;
          state.currentPage=action.payload

        },
    
        // Request failed (Error handling)
        fetchExpenseFailure: (state, action: PayloadAction<Expense[]>) => {
          state.error = action.payload; // Set the error if the request fails
          state.status = 'Failed'; // Explicitly set the status to Failed
        },
        
        // Explicit Success action for Expense registration
        fetchExpenseSuccess: (state,action) => {
          state.status = 'Success'; // Set status to Success
          state.error = null; // Clear any existing errors
          state.Expenses=action.payload.expenses
          state.currentPage=action.payload.pagination.currentPage
          state.totalCount=action.payload.pagination.totalCount
          state.totalPages=action.payload.pagination.totalPages
          state.ExpenseCreated=null
        },
    // Reset state to initial (Loading state)
    reregisterExpenseState: (state) => {
      state.Expense = null;
      state.ExpenseCreated=null
      state.error = null;
      state.status = 'Loading'; // Reset to loading state when initializing the form or on certain actions
    },

  },
});

// Export actions and reducer
export const {
  registerExpenseRequest,
  registerExpenseFailure,
  reregisterExpenseState,
  registerExpenseSuccess,
  fetchExpenseRequest,
  fetchExpenseFailure,
  fetchExpenseSuccess
} = ExpenseSlice.actions;

export default ExpenseSlice.reducer;
