import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import candidateReducer from './reducers/candidateReducer';
import { rootSaga } from "./Sagas/rootSaga"
import authreducer from "./reducers/authreducer"
import registerUserReducer from "./reducers/userReducer"
import incomeReducer from "./reducers/incomereducer"
import expenseReducer from "./reducers/expenseReducer"
// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            candidate: candidateReducer,
            auth: authreducer,
            userData: registerUserReducer,
            income:incomeReducer,
            expense:expenseReducer

        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware), // Add saga middleware here
    });

    // Run the sagas after the store is created
    sagaMiddleware.run(rootSaga); // Replace with your saga watchers

    return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
