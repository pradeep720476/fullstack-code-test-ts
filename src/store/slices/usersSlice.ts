import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";
import { getUser, getUsers } from "../../services/userService";
import { Page } from "../../utils/constant";
import { createSelector } from "reselect";
import { RootState } from "../store";

export interface UserState {
  users: User[];
  hasMore: boolean;
  page: number;
  currentUser?: User | null;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  users: [],
  hasMore: true,
  page: 1,
  currentUser: null,
  loading: false,
  error: {},
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.fulfilled, (state, action: PayloadAction<any>) => {
        const data: User[] = action.payload.data;
        state.loading = false;
        if (state.users.length) {
          const map = new Set(state.users.map((user) => user.id));
          state.users.push(...data.filter((newuser) => !map.has(newuser.id)));
        } else {
          state.users.push(...data);
        }
        if (data.length < Page.pageSize) {
          state.hasMore = false;
          state.page = -1;
        } else {
          state.page = action.payload.page + 1;
          state.hasMore = true;
        }
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.data;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.loading = false;
      });
  },
});

export const selectorUserData = createSelector(
  (state: RootState) => state.usersState,
  (userState: UserState) => ({
    users: userState.users,
    loading: userState.loading,
    error: userState.error,
    hasMore: userState.hasMore,
    page: userState.page,
    currentUser: userState.currentUser,
  }),
);

export const getUsersThunk = createAsyncThunk(
  "users/getUsers",
  async (queryParam: Record<string, any>) => {
    return await getUsers(queryParam);
  },
);

export const getUserThunk = createAsyncThunk(
  "/users/getUser",
  async (id: number) => {
    return await getUser(id);
  },
);

export default userSlice.reducer;
