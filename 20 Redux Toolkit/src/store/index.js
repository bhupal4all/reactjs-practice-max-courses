import { configureStore } from "@reduxjs/toolkit";
import CountReducer from './count-slice';
import AuthReducer from './auth-slice';

const store = configureStore({
  reducer: {
    count: CountReducer,
    auth: AuthReducer
  }
})

export default store;
