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
      {console.log(post)}

      <img
        className="card-image"
        src="https://media.istockphoto.com/id/517643357/photo/thunderstorm-lightning-with-dark-cloudy-sky.jpg?s=1024x1024&w=is&k=20&c=Bj1lc-TNwhlv1JDNLqCdMetB9ji1wrqA84ZsPDXZAgY="
      />
      <div className="card-info">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-description">{post.description}</p>
        <div className="card-other">
          <p>
            {post.author.username === user?.name ? "me" : post.author.username}
          </p>
          <p>Likes: {post.numberOfLikes}</p>
        </div>
      </div>
    </Link>
  ));
}
