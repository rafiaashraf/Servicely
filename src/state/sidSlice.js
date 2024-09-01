import { createSlice } from '@reduxjs/toolkit'

export const sidSlice = createSlice({
    name: 'sid',
    initialState: {
        value: null,
    },
    reducers: {
        setSid: (state,action) => {
            state.value = action.payload
        },
        removeSid: (state) => {
            state.value = null
        }
    },
})

export const selectSid = (state) => state.sid.value;

// Action creators are generated for each case reducer function
export const { setSid,removeSid } = sidSlice.actions

export default sidSlice.reducer