import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearProgressBar({ style }) {
  const content = (
    <Box sx={style}>
      <LinearProgress />
    </Box>
  );

  return <>{content}</>;
}
