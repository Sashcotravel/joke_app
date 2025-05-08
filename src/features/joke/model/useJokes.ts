import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import {
  fetchJokes,
  fetchRandomJoke,
} from "../../../entities/joke/model/thunks";
import { removeJoke } from "../../../entities/joke/model/slice";
import type { Joke } from "../../../entities/joke/model/types";

export const useJokes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jokes, isLoading, error } = useSelector(
    (state: RootState) =>
      state.joke as { jokes: Joke[]; isLoading: boolean; error: string | null }
  );

  const loadJokes = useCallback(() => {
    dispatch(fetchJokes()).unwrap();
  }, [dispatch]);

  const loadRandomJoke = useCallback(
    (id: number) => {
      dispatch(fetchRandomJoke(id)).unwrap();
    },
    [dispatch]
  );

  const deleteJoke = useCallback(
    (id: number) => {
      dispatch(removeJoke(id));
    },
    [dispatch]
  );

  return {
    jokes,
    isLoading,
    error,
    loadJokes,
    loadRandomJoke,
    deleteJoke,
  };
};
