import HandlePosts from "./HandlePosts";
import PostsPagination from "./PostsPagination";
import PostsLimit from "./PostsLimit";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Bookmarks() {
  const { myBookmarks } = useContext(UserContext);

  if (!myBookmarks) {
    return;
  }

  return (
    <div>
      <div className="posts">
        <HandlePosts posts={myBookmarks} />
      </div>

      <div className="control-panel">
        <PostsPagination />
        <PostsLimit />
      </div>
    </div>
  );
}
