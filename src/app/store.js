import { configureStore } from '@reduxjs/toolkit';
import subscriptionReducer from './pages/Subscription/subscriptionSlice';
import globalSlice from './globalSlice';

export default configureStore({
  reducer: {
    clientData: subscriptionReducer,
    global: globalSlice
  },
});
