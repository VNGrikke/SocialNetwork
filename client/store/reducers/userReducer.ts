import { createSlice } from "@reduxjs/toolkit";
import { getUsers, updateUser, getUserInfo } from "../../src/services/user.service";
import { User } from "../../src/interfaces/interface";



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
      .addCase(updateUser.fulfilled, (state, action) => {
        state.items = state.items.map((item: any) => item.id === action.payload.id ? action.payload : item);
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.items = state.items.map((item: any) => item.id === action.payload.id ? action.payload : item);
      });
  },
});

export default usersSlice.reducer;
