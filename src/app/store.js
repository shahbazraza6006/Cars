import {configureStore} from '@reduxjs/toolkit';
import CarReducer from '../Features/Cars/CarSlice';
import UserReducer from '../Features/Users/UserSlice';
export default configureStore({
    reducer:{
      cars:  CarReducer,
      users: UserReducer,
    }
})
