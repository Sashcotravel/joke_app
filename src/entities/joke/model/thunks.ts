import { createAsyncThunk } from "@reduxjs/toolkit";
import { jokeApi } from "../api/jokeApi";
import type { Joke } from "./types";
import type { RootState } from "../../../app/store";

const MAX_RETRIES = 5;

export const fetchJokes = createAsyncThunk(
  "joke/fetchJokes",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const existingJokes = (state as { joke: { jokes: Joke[] } }).joke.jokes;

    let retryCount = 0;
    let allJokes: Joke[] = [];
    let hasDuplicates = true;

    while (hasDuplicates && retryCount < MAX_RETRIES) {
      const newJokes = await jokeApi.getTenJokes();

      if (existingJokes.length > 0) {
        const uniqueJokes = newJokes.filter(
          (newJoke) =>
            !existingJokes.some(
              (existingJoke: Joke) => existingJoke.id === newJoke.id
            )
        );

        const uniqueIds = new Set(uniqueJokes.map((joke) => joke.id));
        hasDuplicates = uniqueIds.size !== uniqueJokes.length;

        if (!hasDuplicates) {
          allJokes = [...existingJokes, ...uniqueJokes];
        }
      } else {
        const uniqueIds = new Set(newJokes.map((joke) => joke.id));
        hasDuplicates = uniqueIds.size !== newJokes.length;

        if (!hasDuplicates) {
          allJokes = newJokes;
        }
      }

      retryCount++;
    }

    if (hasDuplicates) {
      throw new Error("Could not fetch unique jokes after retries");
    }

    return allJokes;
  }
);

export const fetchRandomJoke = createAsyncThunk(
  "joke/fetchRandomJoke",
  async (id: number, { getState }) => {
    const state = getState() as RootState;
    const existingJokes = (state as { joke: { jokes: Joke[] } }).joke.jokes;

    let retryCount = 0;
    let joke: Joke;
    let isDuplicate = true;

    while (isDuplicate && retryCount < MAX_RETRIES) {
      joke = await jokeApi.getRandomJoke();

      if (existingJokes.length > 0) {
        isDuplicate = existingJokes.some(
          (existingJoke: Joke) => existingJoke.id === joke.id
        );
      } else {
        isDuplicate = false;
      }

      retryCount++;
    }

    if (isDuplicate) {
      throw new Error("Could not fetch unique joke after retries");
    }

    return { joke: joke!, id };
  }
);
