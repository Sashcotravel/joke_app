import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Joke, JokeState } from "./types";
import { fetchJokes, fetchRandomJoke } from "./thunks";

const initialState: JokeState = {
  jokes: [],
  isLoading: false,
  error: null,
};

const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {
    addJoke: (state, action: PayloadAction<Joke>) => {
      state.jokes.unshift(action.payload);
    },
    removeJoke: (state, action: PayloadAction<number>) => {
      state.jokes = state.jokes.filter((joke) => joke.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJokes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJokes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jokes = action.payload;
      })
      .addCase(fetchJokes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch jokes";
      })
      .addCase(fetchRandomJoke.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRandomJoke.fulfilled, (state, action) => {
        state.isLoading = false;
        const { joke } = action.payload;
        state.jokes = state.jokes.map((j) =>
          j.id === action.payload.id ? joke : j
        );
      })
      .addCase(fetchRandomJoke.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch random joke";
      });
  },
});

export const { addJoke, removeJoke } = jokeSlice.actions;
export const jokeReducer = jokeSlice.reducer;
