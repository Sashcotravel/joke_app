export type JokeType = "general" | "programming";

export interface Joke {
  id: number;
  setup: string;
  punchline: string;
}

export interface JokeState {
  jokes: Joke[];
  isLoading: boolean;
  error: string | null;
}
