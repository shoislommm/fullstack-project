import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PostsContext } from "../context/PostsContext";
import { UserContext } from "../context/UserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import fetchLikes from "../fetches/fetchLikes";
import { Favorite, FavoriteBorder, WestRounded } from "@mui/icons-material";

export default function Post() {
  const [like, setLike] = useState(false);
  const token = localStorage.getItem("token");
  const { posts } = useContext(PostsContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchLikes(id, token),
    enabled: like,
  });

  console.log(data);

  const post = posts.find((post) => post.id === id);

  return (
    <>
      {user ? (
        <div className="button-parent">
          <Button
            className="details-button"
            variant="contained"
            startIcon={<WestRounded />}
            onClick={() => navigate("/posts")}
          >
            Go Back
          </Button>
          <div className="post-details" key={post.id}>
            <h2 className="details-title"> {post.title}</h2>
            <h3 className="details-content"> {post.content}</h3>
            <div className="details-info">
              <p>
                {post.author.username === user.name
                  ? "me"
                  : post.author.username}
              </p>
              <Button
                variant="contained"
                onClick={() => setLike((prev) => !prev)}
              >
                {like ? <Favorite /> : <FavoriteBorder />}
                <p>{post.numberOfLikes}</p>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/auth" />
      )}
    </>
  );
}
