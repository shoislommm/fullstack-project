import HandlePosts from "./HandlePosts";
import PostsPagination from "./PostsPagination";
import PostsLimit from "./PostsLimit";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Bookmarks() {
  const { myPosts } = useContext(UserContext);

  if (!myPosts) {
    return; // ???
  }

  console.log(myPosts);

  return (
    <div>
      <div className="posts">
        <HandlePosts posts={myPosts} />
      </div>

      <div className="control-panel">
        <PostsPagination />
        <PostsLimit />
      </div>
    </div>
  );
}
