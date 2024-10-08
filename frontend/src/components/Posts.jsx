import HandlePosts from "./HandlePosts";
import PostsPagination from "./PostsPagination";
import PostsLimit from "./PostsLimit";
import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";

export default function Posts() {
  const { posts } = useContext(PostsContext);

  return (
    <div>
      <div className="posts">
        <HandlePosts posts={posts} />
      </div>

      <div className="control-panel">
        <PostsPagination />
        <PostsLimit />
      </div>
    </div>
  );
}
