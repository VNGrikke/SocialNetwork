import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post, User, Comment } from "../interfaces/interface";
import axios from "axios";

export const getUsers: any = createAsyncThunk<User[]>(
    "users/getUsers",
    async () => {
        const response = await axios.get("http://localhost:8888/users");
        return response.data;
    }
);

export const updateUser: any = createAsyncThunk<User, User>(
    "product/updateUser",
    async (User: any) => {
        const response = await axios.put(`http://localhost:8888/users/${User.id}`, User);
        return response.data;
    }
)

