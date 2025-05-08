import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import type { Joke } from "../model/types";

interface JokeItemProps {
  joke: Joke;
  onRefresh: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

export const JokeItem: React.FC<JokeItemProps> = ({
  joke,
  onRefresh,
  onDelete,
  isLoading,
}) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {joke.setup}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {joke.punchline}
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <IconButton
            onClick={() => onRefresh(joke.id)}
            disabled={isLoading}
            color="primary"
            size="small"
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            onClick={() => onDelete(joke.id)}
            disabled={isLoading}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};
