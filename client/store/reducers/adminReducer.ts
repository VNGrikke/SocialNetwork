import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "../../src/interfaces/interface";

export const getPosts = createAsyncThunk<Post[]>(
  "posts/getPosts",
  async () => {
    const response = await axios.get("http://localhost:8888/posts");
    return response.data;
  }
);

export const addPost = createAsyncThunk<Post, Post>(
  "posts/addPost",
  async (newPost: Post) => {
    const response = await axios.post("http://localhost:8888/posts", newPost);
    return response.data;
  }
);

export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (id: number) => {
    await axios.delete(`http://localhost:8888/posts/${id}`);
    return id;
  }
);

export const updatePost = createAsyncThunk<Post, Post>(
  "posts/updatePost",
  async (updatedPost: Post) => {
    const response = await axios.put(`http://localhost:8888/posts/${updatedPost.PostId}`, updatedPost);
    return response.data;
  }
);

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
      .addCase(updatePost.fulfilled, (state, action) => {
        state.items = state.items.map((item) => item.PostId === action.payload.PostId ? action.payload : item);
      });
  },
});

export default postsSlice.reducer;
