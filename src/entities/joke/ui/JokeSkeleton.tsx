import React from "react";
import { Box, Skeleton, Card, CardContent } from "@mui/material";

export const JokeSkeleton: React.FC = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Skeleton variant="text" width="80%" height={24} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={20} />
        <Box
          sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "flex-end" }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </CardContent>
    </Card>
  );
};
