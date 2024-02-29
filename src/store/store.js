import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/Slice"

const store = configureStore({
    reducer : {
        r_reducer : usersReducer
    }
})
export default store