import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "../Reducers/UserReducer"
import CaptainReducer from "../Reducers/CaptainReducer"

export const store = configureStore({
    reducer: {
        user: UserReducer,
        captain: CaptainReducer
    },
})