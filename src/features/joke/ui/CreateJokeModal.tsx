import React, { useState } from "react";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";
import type { Joke } from "../../../entities/joke/model/types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { addJoke } from "../../../entities/joke/model/slice";

interface CreateJokeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateJokeModal: React.FC<CreateJokeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newJoke, setNewJoke] = useState({ setup: "", punchline: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewJoke((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateJoke = () => {
    if (newJoke.setup && newJoke.punchline) {
      const joke: Joke = {
        id: Date.now(),
        setup: newJoke.setup,
        punchline: newJoke.punchline,
      };
      dispatch(addJoke(joke));
      handleClose();
    }
  };

  const handleClose = () => {
    setNewJoke({ setup: "", punchline: "" });
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="create-joke-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Create New Joke
        </Typography>
        <TextField
          fullWidth
          label="Setup"
          name="setup"
          value={newJoke.setup}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={2}
        />
        <TextField
          fullWidth
          label="Punchline"
          name="punchline"
          value={newJoke.punchline}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={2}
        />
        <Box
          sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateJoke}
            disabled={!newJoke.setup || !newJoke.punchline}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
