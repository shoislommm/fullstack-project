import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../context/UserContext";
import fetchUser from "../fetches/fetchUser";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/joy";

// eslint-disable-next-line react/prop-types
export default function UserProvider({ children }) {
  const token = localStorage.getItem("token");

  const { data, isLoading } = useQuery({
    queryKey: ["provider", token],
    queryFn: () => fetchUser(token),
    enabled: !!token,
  });

  if (isLoading) {
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
  const user = data?.user;

  console.log(user);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
