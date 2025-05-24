'use client';

import itemsReducer, { itemsRootSaga } from '@/store/itemsSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

const rootReducer = combineReducers({
  items: itemsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(itemsRootSaga);

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
