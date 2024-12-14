import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
}

export const CaptainSlice = createSlice({
    name: 'captain',
    initialState,
    reducers: {
        captainlogin: (state, { payload }) => {
            console.log('captain logged in', state);
            state.data = payload;
            const { email, fullname, _id } = state.data;
            localStorage.setItem('captain', JSON.stringify({ email, fullname, _id }));
        },
        Createcaptain: (state, { payload }) => {
            state.data = payload;
            const { email, fullname, _id } = state.data;
            localStorage.setItem('captain', JSON.stringify({ email, fullname, _id }));
        },
        CaptainisLocalToState: (state, { payload }) => {
            const captain = JSON.parse(localStorage.getItem('captain'));
            state.data = captain;
        }
    },
})

export const { captainlogin, Createcaptain, CaptainisLocalToState } = CaptainSlice.actions

export default CaptainSlice.reducer