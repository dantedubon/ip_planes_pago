import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'Global',
    initialState:{
        loading: false
    },
    reducers: {
        startLoad: (state) =>{
            return {...state, loading: true}
        },
        endLoad: (state) => {
            return {...state, loading:false}
        }        
    }

});

export const {startLoad, endLoad} = globalSlice.actions;
export const selectLoading = state => state.global.loading;


export default globalSlice.reducer;