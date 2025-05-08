import { axiosInstance } from "../../../shared/api/axios";
import type { Joke } from "../model/types";

export const jokeApi = {
  getRandomJoke: async (): Promise<Joke> => {
    const { data } = await axiosInstance.get<Joke>("/jokes/random");
    return data;
  },

  getTenJokes: async (): Promise<Joke[]> => {
    const { data } = await axiosInstance.get<Joke[]>("/jokes/ten");
    return data;
  },
};
