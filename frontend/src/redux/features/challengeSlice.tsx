import { challengeType } from "@/types/challengeType";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  status: string;
  error: string;
  challenges: challengeType[];
  activeChallenge: challengeType;
} = {
  status: "",
  error: "",
  challenges: [],
  activeChallenge: {
    _id: "",
    name: "",
    points: 0,
    category: "Pwn",
    description: "",
    author: "",
    hints: [],
    attachmentZipName: "",
    attachmentUrl: "",
    websiteLink: "",
    difficulty: "very easy",
    solves: [],
  },
};

type valuesType = {
  token: string;
  flag: string;
  challengeId: string;
  userId: string;
};

type userInfosType = {
  userId: string;
  username: string;
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

export const checkSubmittedFlag = createAsyncThunk(
  "challenge/checkFlag",
  async (values: valuesType, { rejectWithValue }) => {
    const { token, flag, challengeId, userId } = values;
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/challenge/checkFlag`,
        { flag, challengeId, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("checkFlag data : ", data);
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
    increaseChallengeSolves: (state, action: PayloadAction<userInfosType>) => {
      // Increase the challenge solves only for the active solved challenge
      const userId = action.payload.userId;
      const username = action.payload.username;

      state.challenges = state.challenges.map((challenge) => {
        if (challenge._id === state.activeChallenge._id) {
          return {
            ...challenge,
            solves: [
              ...(challenge.solves || []),
              {
                user: { _id: userId, username: username },
                solvedAt: new Date(),
              },
            ],
          };
        } else {
          return challenge;
        }
      });

      state.activeChallenge.solves = [
        ...(state.activeChallenge.solves || []),
        { user: { _id: userId, username: username }, solvedAt: new Date() },
      ];
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

    /* ----- checkFlagSumbitted ----- */
    builder.addCase(checkSubmittedFlag.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(checkSubmittedFlag.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
    });
    builder.addCase(checkSubmittedFlag.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });
  },
});

export const { setActiveChallenge, increaseChallengeSolves } =
  challengeSlice.actions;
export default challengeSlice.reducer;
