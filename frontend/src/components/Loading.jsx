import { Box } from "@mui/material";
import { CircularProgress } from "@mui/joy";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <CircularProgress size="lg" variant="plain" color="neutral" />
    </Box>
  );
}
