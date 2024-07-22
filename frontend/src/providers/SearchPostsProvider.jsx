import { PostsContext } from "../context/PostsContext";
import { SearchPostsContext } from "../context/SearchPostsContext";
import { useState, useContext, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function SearchPostsProvider({ children }) {
  const data = useContext(PostsContext);
  const [requestParams, setRequestParams] = useState("");
  const [newData, setNewData] = useState(data);
  useEffect(() => {}, [data]);

  function handleSearch() {
    if (requestParams === "") {
      setNewData(data);
      return;
    }

    const newPosts = data.posts.map((post) => {
      return post?.title?.trim()?.toLowerCase()?.includes(requestParams)
        ? post
        : null;
    });

    const filteredNewPosts = newPosts.filter((post) => post);

    setNewData((prev) => ({
      ...prev,
      posts: filteredNewPosts,
    }));

    return;
  }

  return (
    <SearchPostsContext.Provider
      value={{ newData, requestParams, setRequestParams, handleSearch }}
    >
      {children}
    </SearchPostsContext.Provider>
  );
}
