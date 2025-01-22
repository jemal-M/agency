import { CandidateData } from "@/types/candidateData";
import { PaginationInfo } from "@/types/pagination";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
export interface CandidateState {
  candidate: CandidateData|null; // Array of candidate data
  candidates: CandidateData[]; // Array of candidate data
  error: any | null;
  status: 'Loading' | 'Success' | 'Failed'; // Handling the loading, success, and failure states
  candidateCreated:any|null,
  currentPage: number,
    totalPages:number,
    totalCount:number,
    limit:number,
}
 


// Define the initial state with correct properties
const initialCandidateState: CandidateState = {
  candidate: null, // Initial empty array for candidates
  candidates:[],
  error: null,    // No error initially
  status: 'Loading', // Initially in loading state
  candidateCreated:null,
  
    currentPage: 1,
    totalPages:1,
    totalCount:0,
    limit:10,
  
};

export const candidateSlice = createSlice({
  name: "candidateSlice",
  initialState: initialCandidateState,
  reducers: {
    // Request to register a candidate (Success case)
    registerCandidateRequest: (state, action: PayloadAction<CandidateData>) => {
      state.candidate = action.payload; // Update the candidate data
      state.status = 'Loading'; // Explicitly mark the status as Success after successful registration
      state.error = null; // Clear previous errors if the registration is successful
    },

    // Request failed (Error handling)
    registerCandidateFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload; // Set the error if the request fails
      state.status = 'Failed'; // Explicitly set the status to Failed
      state.candidate=null
    },
    
    // Explicit Success action for candidate registration
    registerCandidateSuccess: (state,action) => {
      state.status = 'Success'; // Set status to Success
      state.error = null; // Clear any existing errors
   state.candidateCreated=action.payload
    },


        // Request to register a candidate (Success case)
        fetchCandidateRequest: (state,action:PayloadAction<any>) => {
          state.status = 'Loading'; // Explicitly mark the status as Success after successful registration
          state.error = null; // Clear previous errors if the registration is successful
          state.candidate=action.payload;
          state.currentPage=action.payload

        },
    
        // Request failed (Error handling)
        fetchCandidateFailure: (state, action: PayloadAction<CandidateData[]>) => {
          state.error = action.payload; // Set the error if the request fails
          state.status = 'Failed'; // Explicitly set the status to Failed
        },
        
        // Explicit Success action for candidate registration
        fetchCandidateSuccess: (state,action) => {
          state.status = 'Success'; // Set status to Success
          state.error = null; // Clear any existing errors
          state.candidates=action.payload.candidates
          state.currentPage=action.payload.pagination.currentPage
          state.totalCount=action.payload.pagination.totalCount
          state.totalPages=action.payload.pagination.totalPages
          state.candidateCreated=null
        },
    // Reset state to initial (Loading state)
    reregisterCandidateState: (state) => {
      state.candidate = null;
      state.candidateCreated=null
      state.error = null;
      state.status = 'Loading'; // Reset to loading state when initializing the form or on certain actions
    },

  },
});

// Export actions and reducer
export const {
  registerCandidateRequest,
  registerCandidateFailure,
  reregisterCandidateState,
  registerCandidateSuccess,
  fetchCandidateRequest,
  fetchCandidateFailure,
  fetchCandidateSuccess
} = candidateSlice.actions;

export default candidateSlice.reducer;
