import {configureStore} from '@reduxjs/toolkit';
import appConfigReducer from './slices/appConfigSlice';
import postReducer from '../redux/slices/postSlice'
import feedDataReducer from './slices/feedSlice';

export default configureStore({
  reducer:{
      appConfigReducer,
      postReducer,
      feedDataReducer
  }
})