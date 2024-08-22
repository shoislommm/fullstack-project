/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../context/UserContext";
import fetchUser from "../fetches/fetchUser";
import { getBookmarks } from "../fetches/fetchBookmarks";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getPostsByUserId } from "../fetches/fetchPosts";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";

export default function UserProvider({ children }) {
  const location = useLocation();
  const [myPosts, setMyPosts] = useState(null);
  const [myBookmarks, setMyBookmarks] = useState([]);
  const [token, setToken] = useLocalStorage();
  const [tokenFrom, setTokenFrom] = useState("server");
  const [user, setUser] = useState(null);

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", token, tokenFrom],
    queryFn: async () => {
      const data = await fetchUser(token, tokenFrom);
      setUser(data?.user ? data.user : null);
      return data;
    },
    enabled: !!token,
  });

  const { data: bookmarksData, isLoading: isBookmarksLoading } = useQuery({
    queryKey: ["bookmarks", token],
    queryFn: async () => {
      const data = await getBookmarks(token);
      setMyBookmarks(data.bookmarks);
      return data;
    },
    enabled: location.pathname === "/bookmarks",
    staleTime: 0,
    gcTime: 0,
  });

  if (isUserLoading || isBookmarksLoading) {
    return <Loading />;
  }

  const signIn = (token) => {
    setToken(token);
  };

  const signOut = () => {
    setToken();
  };

  const signInWithGoogle = (token) => {
    setToken(token);
  };

  const signOutWithGoogle = () => {
    setToken();
  };

  async function showMyPosts() {
    const data = await getPostsByUserId(token);

    if (data.success === false) {
      console.log(data.message);
      return;
    }
    setMyPosts(data.posts);

    return;
  }

  const data = {
    user,

    myPosts,
    myBookmarks,
    signIn,
    signOut,
    signInWithGoogle,
    signOutWithGoogle,
    setTokenFrom,
    showMyPosts,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}
