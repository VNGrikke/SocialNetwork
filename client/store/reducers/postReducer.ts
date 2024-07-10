import { createSlice } from "@reduxjs/toolkit";
import { getPosts, addPost, deletePost } from "../../src/services/post.service";
import { Post } from "../../src/interfaces/interface";



interface PostState {
    items: Post[];
    loading: boolean;
    error: string | undefined;
}

const initialState: PostState = {
    items: [],
    loading: false,
    error: undefined,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.items = [...state.items, action.payload];
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.PostId !== action.payload);
            })
            
    },
});

export default postsSlice.reducer;
