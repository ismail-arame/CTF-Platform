import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginTypes, registerTypes } from "@/types/authTypes";
import axios from "axios";

const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    token: "",
  },
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (values: registerTypes, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
        { ...values }
      );

      // console.log("register data : ", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (values: loginTypes, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        { ...values }
      );

      // console.log("login data : ", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        token: "",
      };
    },
  },
  extraReducers: (builder) => {
    /* _*************** Register *************** _*/
    //when we send a request it fires the loading state
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
    });

    // When a server responses with the data
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.user = action.payload.user;
    });

    // When a server responses with the data
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });

    /* _*************** Login *************** _*/
    //when we send a request it fires the loading state
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });

    // When a server responses with the data
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.user = action.payload.user;
    });

    // When a server responses with the data
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
