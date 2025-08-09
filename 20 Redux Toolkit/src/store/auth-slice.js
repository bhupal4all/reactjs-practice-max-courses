import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false
  }, 
  reducers: {
    login: function(state) {
      state.isAuthenticated = true;
    },
    logout: function(state){
      state.isAuthenticated = false;
    }
  }
})

export const AuthActions = authSlice.actions;

export default authSlice.reducer;