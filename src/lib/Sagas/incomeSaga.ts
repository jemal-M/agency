import { Action } from 'redux';
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
 import { PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { Income } from '@/types/income';
import { fetchIncomeFailure, fetchIncomeRequest, fetchIncomeSuccess, registerIncomeFailure, registerIncomeRequest, registerIncomeSuccess } from '../reducers/incomereducer';

 

function* registerIncome(action: PayloadAction<Income>): Generator<any, void, any> {
  try {
    const formData = new FormData();
 const {
 
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
    const response: AxiosResponse = yield call(
      axiosInstance.post,
      '/income/create',
      formData,
      {
        headers:{
          "Content-Type":"multipart/form-data",
          "Accept":"application/json"
 
        }
      }
    );

    if (response.status === 201) {
      yield put(registerIncomeSuccess(response.data));
    } else {
      yield put(registerIncomeFailure('Registration failed: ' + (response.data.error || 'Unknown error')));
    }
  } catch (error: any) {
    console.log(error);
    
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred during registration';
    yield put(registerIncomeFailure(errorMessage));
  }
}

function* fetchIncome(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const    {
      currentPage,
    }=action.payload
    const response: AxiosResponse = yield call(
      axiosInstance.get,
      '/income/list',
      {
        params:{
          page:currentPage,
          limit:10,
        }
      }
     
    );

    if (response.status === 200) {
      yield put(fetchIncomeSuccess(response.data));
    } else {
 
      yield put(fetchIncomeFailure((response.data.error || 'Unknown error')));
    }
  } catch (error: any) {
    console.log(error);
    
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred during registration';
    yield put(fetchIncomeFailure(errorMessage));
  }
}
// Watcher saga: listens for specific action and triggers the worker saga
export function* watchIncome() {
  yield takeLatest(registerIncomeRequest.type, registerIncome); // Listens for 'registerCandidateRequest' action
  yield takeLeading(fetchIncomeRequest.type, fetchIncome); // Listens for 'fetchCandidateRequest' action

}
