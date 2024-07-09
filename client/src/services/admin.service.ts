import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces/interface";
import axios from "axios";



export const getUsers: any = createAsyncThunk<User[]>(
    "admin/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<User[]>(`http://localhost:8888/users`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

export const addUser = createAsyncThunk<User, User, { state: any }>(
    "admin/addUser",
    async (user, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const existingUser = state.users.items.find((item: User) => item.id === user.id);

            if (existingUser) {
                return rejectWithValue("User already exists");
            }

            const response = await axios.post<User>(`http://localhost:8888/users`, user);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

export const updateUser:any = createAsyncThunk<User, User>(
    "admin/updateUser",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.put<User>(`http://localhost:8888/users/${user.id}`, user);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

export const deleteUser:any = createAsyncThunk<number, number>(
    "admin/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:8888/users/${id}`);
            return id;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);