import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  status: string;
  error: string;
  competitionStartDate: string;
  competitionEndDate: string;
} = {
  status: "",
  error: "",
  competitionStartDate: "",
  competitionEndDate: "",
};

// get competition date
export const getCompetitionDate = createAsyncThunk(
  "/competitionDate/",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/competitionDate/`
      );

      console.log("competitionDate data : ", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const competitionDateSlice = createSlice({
  name: "competitionDate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* _*************** getCompetitionDate *************** _*/
    builder.addCase(getCompetitionDate.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getCompetitionDate.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.competitionStartDate = action.payload[0].competitionStartDate;
      state.competitionEndDate = action.payload[0].competitionEndDate;
    });

    builder.addCase(getCompetitionDate.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });
  },
});

// export const { logout, increaseUserSolves, clearAuthenticationError } = userSlice.actions;
export default competitionDateSlice.reducer;
