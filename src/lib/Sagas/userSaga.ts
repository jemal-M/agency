import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Login } from '@/types/auth';
import { fetchUserFailure, fetchUserRequest, fetchUserSuccess, registerUserFailure, registerUserRequest, registerUserSuccess } from '../reducers/userReducer';
import { AxiosResponse } from 'axios';
import axiosInstance from '../axiosInstance';
import { User } from '@/types/user';
// Replace `CandidateData` with the structure for login data
function* registerUser(action: PayloadAction<User>): Generator<any, void, any> {
  try {
    const { email, phone, firstName, lastName, password, department, position, salary, role, startDate } = action.payload;

    // Prepare the payload for the registration
    const registerPayload = {
      email,          // user email
      phone,          // user phone number
      firstName,      // first name
      lastName,       // last name
      password,       // password
      department,     // department (optional)
      position,       // position (optional)
      salary,         // salary (optional)
      role,
      startDate: startDate ? startDate.toISOString().split("T")[0] : null,       // role (e.g., ADMIN, EMPLOYEE, etc.)
    };

    // Send registration request
    const response: AxiosResponse = yield call(
      axiosInstance.post,
      '/user/register',  // Adjust if your API path is different
      registerPayload,
      {
        headers: {
          "Content-Type": "application/json",  // Ensure content type is correct
          "Accept": "application/json",
        },
      }
    );

    // Handle successful response
    yield put(registerUserSuccess(response.data));  // Dispatch success with response data

  } catch (error: any) {
    // Handle errors (network, validation, etc.)
    const errorMessage = error.response?.data?.error || 'An error occurred while registering the user.';
    yield put(registerUserFailure(errorMessage));  // Dispatch failure with error message
  }
}


function* fetchUser(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const    {
      currentPage,
    }=action.payload
    // Send login request
    const response: AxiosResponse = yield call(
      axiosInstance.get,
      '/user/list',
      {
        params:{
          page:currentPage,
          limit:6,
        }
      }
    );

    // Handle successful response

    yield put(fetchUserSuccess(response.data));


  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'An error occurred while registering the user.'
    yield put(fetchUserFailure(errorMessage)); // Dispatch failure action
  }
}
// Watcher saga: listens for specific action and triggers the worker saga
export function* watchRegisterUser() {
  yield takeLatest(registerUserRequest.type, registerUser);
  yield takeLatest(fetchUserRequest.type, fetchUser);


}