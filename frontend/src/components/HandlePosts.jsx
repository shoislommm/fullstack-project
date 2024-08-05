import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import { SearchPostsContext } from "../context/SearchPostsContext";
import { UserContext } from "../context/UserContext";

export default function HandlePosts() {
  const data = useContext(PostsContext);
  const { searchPosts } = useContext(SearchPostsContext);
  const posts = data.posts;
  const [show, setShow] = useState(posts);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (searchPosts.length <= 0) {
      setShow(posts);
    } else {
      setShow(searchPosts);
    }
  }, [posts, searchPosts]);

  return show.map((post) => (
    <Link className="post-card" key={post.id} to={`/posts/${post.id}`}>
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
