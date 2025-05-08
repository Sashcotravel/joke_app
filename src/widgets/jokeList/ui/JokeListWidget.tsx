import React, { useEffect, useState } from "react";
import { Box, Button, Alert, Snackbar } from "@mui/material";
import { JokeItem } from "../../../entities/joke/ui/JokeItem";
import { JokeSkeleton } from "../../../entities/joke/ui/JokeSkeleton";
import { CreateJokeModal } from "../../../features/joke/ui/CreateJokeModal";
import { useJokes } from "../../../features/joke/model/useJokes";
import type { Joke } from "../../../entities/joke/model/types";

export const JokeListWidget: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { jokes, isLoading, error, loadJokes, loadRandomJoke, deleteJoke } =
    useJokes();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (jokes.length === 0) {
      loadJokes();
    }
  }, [loadJokes, jokes.length]);

  const renderJokes = () => {
    if (isLoading && jokes.length === 0) {
      return Array.from({ length: 8 }).map((_, index) => (
        <Box key={index} sx={{ display: "flex" }}>
          <Box sx={{ width: "100%", height: "100%" }}>
            <JokeSkeleton />
          </Box>
        </Box>
      ));
    }

    return jokes.map((joke: Joke) => (
      <Box key={joke.id} sx={{ display: "flex" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <JokeItem
            joke={joke}
            onRefresh={loadRandomJoke}
            onDelete={deleteJoke}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleOpenModal}
          disabled={isLoading}
          color="primary"
        >
          Add Joke
        </Button>
      </Box>

      <CreateJokeModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {renderJokes()}
      </Box>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={loadJokes}
          disabled={isLoading}
          color="secondary"
        >
          Load more
        </Button>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
