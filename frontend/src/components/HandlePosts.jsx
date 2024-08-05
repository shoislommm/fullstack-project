import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import { SearchPostsContext } from "../context/SearchPostsContext";
import { UserContext } from "../context/UserContext";
import { ProfileContext } from "../context/ProfileContext";

export default function HandlePosts() {
  const { posts } = useContext(PostsContext);
  const { showMyPosts } = useContext(ProfileContext);
  const { searchPosts } = useContext(SearchPostsContext);
  const [allPosts, setAllPosts] = useState(posts);
  const [show, setShow] = useState(allPosts);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (searchPosts.length <= 0 && !showMyPosts) {
      setShow(allPosts);
    } else if (showMyPosts) {
      setShow(allPosts.filter((post) => post.author.username === user.name));
    } else {
      setShow(searchPosts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPosts, searchPosts, showMyPosts]);

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
