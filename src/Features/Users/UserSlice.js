import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useMemo } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
const initialState = {
    users: [],
    responseStatus: "",
    responseMessage: "",

}
export const createUser = createAsyncThunk(
    "user/create",
    async (users, { rejectWithValue }) => {
      console.log("Received data:", users); 
      try {
        const response = await axios.post("http://localhost:3009/user/signup", users);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data.message);
      }
    }
  );


  export const loginUser = createAsyncThunk(
    "user/login",
    async (users, { rejectWithValue }) => {
        console.log("Received data:", users);
        try {
            const response = await axios.post("http://localhost:3009/user/login", users);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);
export const loginUsers = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3009/user/login', {
          email,
          password
          
        });
      
        localStorage.setItem('token', response.data.token);
        window.location.reload();
        Navigate('/');
       
        return response.data.token; // Return the token so you can access it in the Redux store if needed
      } catch (error) {
        return rejectWithValue('Login failed'); // Return the error message to handle in the component
      }
    }
  );
   

  
  

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
     [createUser.pending]: (state,action) => {
        return{
            ...state,
            responseStatus: "loading",
        };
       
      },
        [createUser.fulfilled]: (state, action) => {
            return{
                ...state,
                responseStatus: "succeeded",
                users: action.payload,
            };
          
        },
        [createUser.rejected]: (state, action) => {
            return{
                ...state,
                responseStatus: "failed",
                responseMessage: action.payload,
            };
          
        }
        


    }
})

export default userSlice.reducer;
