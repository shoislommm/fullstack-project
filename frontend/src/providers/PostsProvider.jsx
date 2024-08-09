/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/joy";
import { PostsContext } from "../context/PostsContext";
import fetchPosts from "../fetches/fetchPosts";

// eslint-disable-next-line react/prop-types
export default function PostsProvider({ children }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const {
    data: results,
    isLoading: isLoading,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => fetchPosts(page, limit),
  });

  function handlePagination(event, page) {
    setPage(page);
    setLimit(limit);
  }

  function handleLimit(event) {
    setLimit(event.target.value);
    setPage(1);
  }

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

  const posts = results.posts;
  const totalPages = results.totalPages;

  const data = {
    posts,
    page,
    limit,
    totalPages,
    handlePagination,
    handleLimit,
    refetchPosts,
  };

  return <PostsContext.Provider value={data}>{children}</PostsContext.Provider>;
}
