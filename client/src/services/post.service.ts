import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../interfaces/interface";
import axios from "axios";

export const getPosts: any = createAsyncThunk<Post[]>(
    "posts/getPosts",
    async () => {
        const response = await axios.get("http://localhost:8888/posts");
        return response.data;
    }
);

export const addPost: any = createAsyncThunk<Post, Post>(
    "posts/addPost",
    async (newPost: Post) => {
        const response = await axios.post("http://localhost:8888/posts", newPost);
        return response.data;
    }
);

export const deletePost: any = createAsyncThunk<number, number>(
    "posts/deletePost",
    async (id: number) => {
        await axios.delete(`http://localhost:8888/posts/${id}`);
        return id;
    }
);



