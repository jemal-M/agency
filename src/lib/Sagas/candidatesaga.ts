import { Action } from 'redux';
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { CandidateData } from '@/types/candidateData';
import { fetchCandidateFailure, fetchCandidateRequest, fetchCandidateSuccess, registerCandidateFailure, registerCandidateRequest, registerCandidateSuccess } from '../reducers/candidateReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';

 

function* registerCandidate(action: PayloadAction<CandidateData>): Generator<any, void, any> {
  try {
    const formData = new FormData();
 const {
  id_of_relative,
  cocFile,
  passport,
  photo_3_X_4,
  photo_10_X_15,
  self_id_card,
  ...rest}
  =action.payload;
    // Append all non-file fields to FormData
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });
 // Append file fields if they are instances of File or Blob
 const fileFields = {
  cocFile,
  passport,
  photo_3_X_4,
  photo_10_X_15,
  self_id_card,
  id_of_relative
};

Object.entries(fileFields).forEach(([key, value]) => {
  if (value instanceof File) {
    console.log(value);
    
    formData.append(key, value);
  } else {
    console.log(`No file provided for ${key}`);
  }
});
    const response: AxiosResponse = yield call(
      axiosInstance.post,
      '/candidate/register',
      formData,
      {
        headers:{
          "Content-Type":"multipart/form-data",
          "Accept":"application/json"
 
        }
      }
    );

    if (response.status === 201) {
      yield put(registerCandidateSuccess(response.data));
    } else {
      yield put(registerCandidateFailure('Registration failed: ' + (response.data.error || 'Unknown error')));
    }
  } catch (error: any) {
    console.log(error);
    
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred during registration';
    yield put(registerCandidateFailure(errorMessage));
  }
}

function* fetchCandidate(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const    {
      currentPage,
    }=action.payload
    const response: AxiosResponse = yield call(
      axiosInstance.get,
      '/candidate/list',
      {
        params:{
          page:currentPage,
          limit:10,
        }
      }
     
    );

    if (response.status === 200) {
      yield put(fetchCandidateSuccess(response.data));
    } else {
 
      yield put(fetchCandidateFailure((response.data.error || 'Unknown error')));
    }
  } catch (error: any) {
    console.log(error);
    
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred during registration';
    yield put(fetchCandidateFailure(errorMessage));
  }
}
// Watcher saga: listens for specific action and triggers the worker saga
export function* watchRegisterCandidate() {
  yield takeLatest(registerCandidateRequest.type, registerCandidate); // Listens for 'registerCandidateRequest' action
  yield takeLeading(fetchCandidateRequest.type, fetchCandidate); // Listens for 'fetchCandidateRequest' action

}
