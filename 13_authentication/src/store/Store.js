import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authenticationReducer from './reducers/authentication/authentication';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

const persistConfig = {
  key: 'persist-key',
  storage: AsyncStorage,
  version: 1,
};

const appReducer = combineReducers({
  authentication: authenticationReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {warnAfter: 2000},
      // serializableCheck: { warnAfter: 128 },
    }),
});

const persistor = persistStore(store);

export {store, persistor};
