import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
}

export const UsersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        Userlogin: (state, { payload }) => {
            console.log('user logged in', state);
            state.data = payload;
            const { email, fullname, _id } = state.data;
            localStorage.setItem('user', JSON.stringify({ email, fullname, _id }));
        },
        CreateUser: (state, { payload }) => {
            state.data = payload;
            const { email, fullname, _id } = state.data;
            localStorage.setItem('user', JSON.stringify({ email, fullname, _id }));
        },
        isLocalToState: (state, { payload }) => {
            const user = JSON.parse(localStorage.getItem('user'));
            state.data = user;
        }
    },
})

export const { Userlogin, decrement, incrementByAmount, CreateUser, isLocalToState } = UsersSlice.actions

export default UsersSlice.reducer