import { PostsContext } from "../context/PostsContext";
import { SearchPostsContext } from "../context/SearchPostsContext";
import { useState, useContext } from "react";

// eslint-disable-next-line react/prop-types
export default function SearchPostsProvider({ children }) {
  const data = useContext(PostsContext);
  const [requestParams, setRequestParams] = useState("");
  const [searchPosts, setSearchPosts] = useState([]);

  function handleSearch() {
    if (requestParams === "") {
      setSearchPosts(null);
      return;
    }

    const newPosts = data.posts.map((post) => {
      return post?.title?.trim()?.toLowerCase()?.includes(requestParams)
        ? post
        : null;
    });

    const filteredNewPosts = newPosts.filter((post) => post);

    setSearchPosts(() => filteredNewPosts);

    return;
  }

  return (
    <SearchPostsContext.Provider
      value={{ searchPosts, requestParams, setRequestParams, handleSearch }}
    >
      {children}
    </SearchPostsContext.Provider>
  );
}
