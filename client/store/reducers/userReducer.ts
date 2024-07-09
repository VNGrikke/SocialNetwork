import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../src/interfaces/interface";
interface User2 extends User{
    id: number;
}

export const getUsers:any = createAsyncThunk<User[]>(
  "users/getUsers",
  async () => {
    const response = await axios.get("http://localhost:8888/users");
    return response.data;
  }
);

export const getUserInfo:any = createAsyncThunk<User, number>(
  "users/getUserInfo",
  async (id: number) => {
    const response = await axios.get(`http://localhost:8888/users/${id}`);
    return response.data;
  }
);

export const updateUser:any = createAsyncThunk<User2, User2>(
  "users/updateUser",
  async (updatedUser: User2) => {
    const response = await axios.put(`http://localhost:8888/users/${updatedUser.id}`, updatedUser);
    return response.data;
  }
);

interface UserState {
  items: User[];
  loading: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  items: [],
  loading: false,
  error: undefined,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.items = state.items.map((item:any) => item.id === action.payload.id ? action.payload : item);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.items = state.items.map((item:any) => item.id === action.payload.id ? action.payload : item);
      });
  },
});

export default usersSlice.reducer;
