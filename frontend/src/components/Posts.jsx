import HandlePosts from "./HandlePosts";
import PostsPagination from "./PostsPagination";
import PostsLimit from "./PostsLimit";

export default function Posts() {
  return (
    <div>
      <div className="posts">
        <HandlePosts />
      </div>

      <div className="control-panel">
        <PostsPagination />
        <PostsLimit />
      </div>
    </div>
  );
}
