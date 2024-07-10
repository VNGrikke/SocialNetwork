import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/postReducer";
import usersReducer from "./reducers/userReducer";

const store:any = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
    },
});

export default store;
