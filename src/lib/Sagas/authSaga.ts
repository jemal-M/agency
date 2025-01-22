import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance, { AxiosResponse } from 'axios'; // Assuming axiosInstance is already set up
import { PayloadAction } from '@reduxjs/toolkit';
import { Login } from '@/types/auth';
import { loginFailure, loginRequest, loginSuccess, logoutRequest, logoutSuccess } from '../reducers/authreducer';
 import Cookies from 'js-cookie';
// Replace `CandidateData` with the structure for login data
 

function* loginCandidate(action: PayloadAction<Login>): Generator<any, void, any> {
  try {
    const { email_or_phone, password } = action.payload;

    // Prepare the payload for login
    const loginPayload = {
      email_or_phone, // either email or phone
      password,
    };

    // Send login request
    const response: AxiosResponse = yield call(
      axiosInstance.post,
      '/api/login', // Assuming the login endpoint is '/auth/login'
      loginPayload,
      {
        headers: {
          "Content-Type": "application/json", // Set appropriate content type
          "Accept": "application/json",
        },
      }
    );

    // Handle successful response
   
      yield put(loginSuccess(response.data));  
      Cookies.set('user',JSON.stringify(response.data.user));
      Cookies.set('token',JSON.stringify(response.data.token));
    
  } catch (error: any) {
   
    
    // Handle error message
     
    yield put(loginFailure(error.response?.data)); // Dispatch failure action
  }
}

function* logoutCandidate(action: PayloadAction<Login>): Generator<any, void, any> {
  try {
    // Send login request
    const response: AxiosResponse = yield call(
      axiosInstance.post,
      '/api/logout' 
    );

    // Handle successful response
    if (response.status === 200) {
      yield put(logoutSuccess(response.data));  
         Cookies.remove('user');
  Cookies.remove('token');

    } else {
      yield put(loginFailure('Login failed: ' + (response.data.error || 'Unknown error')));
    }
  } catch (error: any) {
    console.log(error);
    
    // Handle error message
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred during login';
    yield put(loginFailure(errorMessage)); // Dispatch failure action
  }
}
// Watcher saga: listens for specific action and triggers the worker saga
export function* watchLogin() {
    yield takeLatest(loginRequest.type, loginCandidate);  
    yield takeLatest(logoutRequest.type, logoutCandidate);  

   
  }