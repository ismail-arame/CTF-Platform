import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "",
  error: "",
  challenges: [],
  activeChallenge: {
    id: "",
    name: "",
    points: "",
    category: "",
    description: "",
    author: "",
    hints: [],
    attachmentZipName: "",
    attachmentUrl: "",
    websiteLink: "",
    difficulty: "",
    solves: [],
  },
};

/* _*_*_*_*_*_*_*_*_*_*_* functions *_*_*_*_*_*_*_*_*_*_* _ */

//get challenges function
export const getChallenges = createAsyncThunk(
  "challenge/all",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/challenge`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

/* _*_*_*_*_*_*_*_*_*_*_* functions *_*_*_*_*_*_*_*_*_*_* _ */

export const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    setActiveChallenge: (state, action) => {
      state.activeChallenge = action.payload;
    },
  },
  extraReducers: (builder) => {
    /* ----- getConversations ----- */
    builder.addCase(getChallenges.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getChallenges.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.challenges = action.payload;
    });
    builder.addCase(getChallenges.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });
  },
});

export const { setActiveChallenge } = challengeSlice.actions;
export default challengeSlice.reducer;
