/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../context/UserContext";
import fetchUser from "../fetches/fetchUser";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/joy";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function UserProvider({ children }) {
  const [token, setToken] = useLocalStorage();
  const [user, setUser] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["provider", token],
    queryFn: () => fetchUser(token),
    enabled: !!token,
  });

  useEffect(() => {
    setUser(data?.user ? data.user : null);
  }, [data, token]);

  const signout = () => {
    setToken();
  };

  const signin = (token) => {
    setToken(token);
  };

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

  return (
    <UserContext.Provider value={{ user, signout, signin }}>
      {children}
    </UserContext.Provider>
  );
}
