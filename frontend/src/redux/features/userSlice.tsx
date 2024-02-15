import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginTypes, registerTypes } from "@/types/authTypes";
import axios from "axios";
import { userType } from "@/types/userType";

const initialState: {
  status: string;
  error: string;
  user: userType;
} = {
  status: "",
  error: "",
  user: {
    _id: "",
    fullname: "",
    username: "",
    email: "",
    picture: "",
    solves: [],
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

      return data;
    } catch (error: any) {
      console.log("login error: ", error);
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

// get users function
export const getUsers = createAsyncThunk(
  "/user/all",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (error: any) {
      console.log("login error: ", error);
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

// get user by id function
export const getUserById = createAsyncThunk(
  "/user/userId",
  async (values: any, { rejectWithValue }) => {
    try {
      const { token, userId } = values;
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

// get scoreboard function
export const getScoreboard = createAsyncThunk(
  "/scoreboard/",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/scoreboard/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
        _id: "",
        fullname: "",
        username: "",
        email: "",
        picture: "",
        solves: [],
        token: "",
      };
    },
    increaseUserSolves: (state, action: PayloadAction<string>) => {
      const challengeId = action.payload;

      state.user.solves = [
        ...(state.user.solves || []),
        { challenge: challengeId, solvedAt: new Date() },
      ];
    },
    clearAuthenticationError: (state) => {
      state.error = "";
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
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.user = action.payload.user;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });

    /* _*************** getUsers *************** _*/
    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });

    /* _*************** getScoreboard *************** _*/
    builder.addCase(getScoreboard.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getScoreboard.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
    });

    builder.addCase(getScoreboard.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });

    /* _*************** getUserById *************** _*/
    builder.addCase(getUserById.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
    });

    builder.addCase(getUserById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });
  },
});

export const { logout, increaseUserSolves, clearAuthenticationError } =
  userSlice.actions;
export default userSlice.reducer;
