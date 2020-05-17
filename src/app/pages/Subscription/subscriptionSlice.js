import { createSlice } from '@reduxjs/toolkit';

export const subscriptionSlice = createSlice({
    name: 'clientData',
    initialState: {
       placa: '',
       rtn: '',
       estadoCuenta: {
           detalle:[]
       },
       tuav: 0,
       tuavMulta: 0,
       tuavTotal: 0,
       tvm: 0,
       tvmMulta: 0,
       tvmTotal: 0,
       cspssxxi: 0,
       total: 0

    },
    reducers:{
        setClientData: (state, action) => {
            return {...state, ...action.payload}
        }
    }
});

export const {setClientData} = subscriptionSlice.actions;

export const selectClientData = state => state.clientData

export default subscriptionSlice.reducer;