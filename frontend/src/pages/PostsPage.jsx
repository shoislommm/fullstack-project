import Header from "../components/Header";
import Posts from "../components/Posts";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function PostsPage() {
  const user = useContext(UserContext);

  // if (!user) {
  //   return <Navigate to="/auth?type=login" />;
  // }

  return (
    <>
      <Header />
      <Posts />
    </>
  );
}
