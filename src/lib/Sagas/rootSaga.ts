import { all } from 'redux-saga/effects';
import { watchRegisterCandidate } from './candidatesaga';
import { watchLogin } from './authSaga';
import { watchRegisterUser } from './userSaga';
import { watchIncome } from './incomeSaga';
import { watchExpense } from './expenseSaga';
// Combine all sagas into a rootSaga
export function* rootSaga() {
  yield all([
    watchRegisterCandidate(),
    watchLogin(),
    watchRegisterUser(),
    watchIncome(),
    watchExpense()
  ]);
}
