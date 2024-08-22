/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PostsContext } from "../context/PostsContext";
import { getPosts } from "../fetches/fetchPosts";
import Loading from "../components/Loading";

// eslint-disable-next-line react/prop-types
export default function PostsProvider({ children }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [requestParams, setRequestParams] = useState("");

  const {
    data: results,
    isLoading,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["posts", page, limit, requestParams],
    queryFn: () => getPosts(page, limit, requestParams),
  });

  function handlePagination(event, page) {
    setPage(page);
    setLimit(limit);
  }

  function handleLimit(event) {
    setLimit(event.target.value);
    setPage(1);
  }

  function handleSearch(params) {
    setRequestParams(params);
  }

  if (isLoading) {
    return <Loading />;
  }

  const posts = results.posts;
  const totalPages = results.totalPages;

  const data = {
    posts,
    page,
    limit,
    totalPages,
    requestParams,
    refetchPosts,
    handlePagination,
    handleLimit,
    handleSearch,
  };

  return <PostsContext.Provider value={data}>{children}</PostsContext.Provider>;
}
