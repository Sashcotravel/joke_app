import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Collapse,
  Paper,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { Joke as JokeType } from "../model/types";
import { styled } from "@mui/material/styles";

interface JokeProps {
  joke: JokeType;
  onRefresh: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
  },
}));

const ExpandButton = styled(IconButton)(({ theme }) => ({
  transform: "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  "&.expanded": {
    transform: "rotate(180deg)",
  },
}));

export const Joke: React.FC<JokeProps> = ({
  joke,
  onRefresh,
  onDelete,
  isLoading,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: "primary.main",
              flex: 1,
              mr: 2,
            }}
          >
            {joke.setup}
          </Typography>
          <ExpandButton
            onClick={handleExpandClick}
            className={expanded ? "expanded" : ""}
            aria-expanded={expanded}
            aria-label="показати відповідь"
          >
            <ExpandMoreIcon />
          </ExpandButton>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "grey.50",
              borderRadius: 1,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {joke.punchline}
            </Typography>
          </Paper>
        </Collapse>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            onClick={() => onRefresh(joke.id)}
            disabled={isLoading}
            color="primary"
            size="small"
            sx={{
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            onClick={() => onDelete(joke.id)}
            disabled={isLoading}
            color="error"
            size="small"
            sx={{
              "&:hover": {
                bgcolor: "error.light",
                color: "white",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};
