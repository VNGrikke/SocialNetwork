import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post, User, Comment } from "../interfaces/interface";
import axios from "axios";
interface User2 extends User {
    id: number;
}

export const getUsers:any = createAsyncThunk<User[]>(
    "users/getUsers",
    async () => {
        const response = await axios.get("http://localhost:8888/users");
        return response.data;
    }
);

export const updateUser:any = createAsyncThunk<User, User2>(
    "users/updateUser",
    async (updatedUser: User2) => {
        const response = await axios.put(`http://localhost:8888/users/${updatedUser.id}`, updatedUser);
        return response.data;
    }
);

export const getUserInfo:any = createAsyncThunk<User, number>(
    "users/getUserInfo",
    async (userId: number) => {
        const response = await axios.get<User>(`http://localhost:8888/users/${userId}`);
        return response.data;
    }
);

