

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useMemo } from "react";


const initialState = {
  cars: [],
  responseStatus: "",
  responseMessage: "",
  currentPage: 0,
  
 
};

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (currentPage, { rejectWithValue }) => {
    try {
      console.log("currentPage",currentPage);
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        token: token,
      };

      const response = await axios.get(
        `http://localhost:3009/car/getcar?page=${currentPage}`,
        { headers }
      );

      return response.data.cars;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCars = createAsyncThunk(
  "cars/createCars",
  async (data, { rejectWithValue }) => {
    console.log("Received data:", data);
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "multipart/form-data",
      token: token,
    };
    try {
      const response = await axios
        .post("http://localhost:3009/car/upload", data, { headers })
        .then((res) => {
        
          console.log(res);
          alert("Car Added Successfully");
          window.location.reload();
        })
        return response.data;
        
     
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (carId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        token: token,
      };
      await axios.delete(`http://localhost:3009/car/deletecar/${carId}`, {
        headers,
      });
      window.location.reload();
     
      return carId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async ({ carId, data}, { rejectWithValue }) => {
    console.log("Received data:", data);
    console.log(carId)
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "multipart/form-data",
      token: token,
    };
    try {
      const response = await axios
        .put(`http://localhost:3009/car/updatecar/${carId}`, data, {
          headers,
        })
        .then((res) => {
          alert("Car Updated Successfully");
          console.log(res);
          window.location.reload();
        });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers:  {
  
      
      [createCars.pending]: (state) => {
        state.responseStatus = "loading";
      },
      [createCars.fulfilled]: (state, action) => {
        state.responseStatus = "succeeded";
        state.cars = action.payload;
      },
      [createCars.rejected]: (state, action) => {
        state.responseStatus = "failed";
        state.responseMessage = action.payload;
      },
      [fetchCars.pending]: (state) => {
        state.responseStatus = "loading";
      },
      [fetchCars.fulfilled]:(state, action) => {
        state.responseStatus = "succeeded";
        state.cars = action.payload;
        console.log("action",action.payload);
        
      },
      [fetchCars.rejected]: (state, action) => {
        state.responseStatus = "failed";
        state.responseMessage = action.payload;
      },
      [deleteCar.pending]: (state) => {
        state.responseStatus = "loading";
      },
     [deleteCar.fulfilled]: (state, action) => {
        state.responseStatus = "succeeded";
        state.cars = state.cars.filter((car) => car._id !== action.payload);
      },
     [deleteCar.rejected]: (state, action) => {
        state.responseStatus = "failed";
        state.responseMessage = action.payload;
      },
      [updateCar.pending]: (state) => {
        state.responseStatus = "loading";
      }
      ,
      [updateCar.fulfilled]: (state, action) => {
        state.responseStatus = "succeeded";
        state.cars = state.cars.filter((car) => car._id !== action.payload);
      }
      ,
      [updateCar.rejected]: (state, action) => {
        state.responseStatus = "failed";
        state.responseMessage = action.payload;
      }
      ,


  },
});


export const { setCurrentPage } = carSlice.actions;
export default carSlice.reducer;









