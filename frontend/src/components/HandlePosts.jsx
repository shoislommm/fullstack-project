import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { AccountCircle, Favorite } from "@mui/icons-material";

export default function HandlePosts({ posts }) {
  const { user } = useContext(UserContext);

  return posts.map((post) => (
    <Link className="post-card" key={post.id} to={`/posts/${post.id}`}>
      {post.banner !== null ? (
        <img
          className="card-banner"
          src={`http://localhost:4001/${post.banner}`}
        />
      ) : null}
      <div className="card-info">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-description">{post.description}</p>
        <div className="card-other">
          <p className="card-user">
            <AccountCircle />
            {post.author.username === user?.name ? "me" : post.author.username}
          </p>
          <p className="card-user">
            <Favorite /> {post.numberOfLikes}
          </p>
        </div>
      </div>
    </Link>
  ));
}
