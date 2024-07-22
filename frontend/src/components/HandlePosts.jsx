import { Link } from "react-router-dom";
import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";
import { SearchPostsContext } from "../context/SearchPostsContext";
import { UserContext } from "../context/UserContext";

export default function HandlePosts() {
  const data = useContext(PostsContext);
  const user = useContext(UserContext);
  const { newData } = useContext(SearchPostsContext);
  const posts = data.posts;
  const newPosts = newData.posts;
  const show = newPosts || posts;

  return show.map((post) => (
    <Link className="post-card" key={post?.id} to={`/posts/${post?.id}`}>
      <h2>Title: {post.title}</h2>
      <h3>Content: {post.content}</h3>
      <p>
        Author:
        {post.author.username === user?.name ? "me" : post.author.username}
      </p>
      <p>Likes: {post.numberOfLikes}</p>
    </Link>
  ));
}
