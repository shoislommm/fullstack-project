import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import { SearchPostsContext } from "../context/SearchPostsContext";
import { UserContext } from "../context/UserContext";
import { ProfileContext } from "../context/ProfileContext";
import MarkdownPreview from "../functions/MarkdownPreview";

export default function HandlePosts() {
  const { posts } = useContext(PostsContext);
  const { showMyPosts } = useContext(ProfileContext);
  const { searchPosts } = useContext(SearchPostsContext);
  const [show, setShow] = useState(posts);
  const [allPosts, setAllPosts] = useState(show);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (searchPosts.length <= 0 && !showMyPosts) {
      setShow(posts);
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
      <p>
        Content: <MarkdownPreview markdown={post.content} />
      </p>
      <p>
        Author:
        {post.author.username === user?.name ? "me" : post.author.username}
      </p>
      <p>Likes: {post.numberOfLikes}</p>
    </Link>
  ));
}
