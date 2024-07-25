/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import fetchPost from "../fetches/fetchPost";
import fetchComments from "../fetches/fetchComments";
import fetchLikes from "../fetches/fetchLikes";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  WestRounded,
  Person,
} from "@mui/icons-material";

export default function PostDetails() {
  const [clickedIcon, setClickedIcon] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [limit, setLimit] = useState(5);
  const [cursor, setCursor] = useState("");
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [token] = useLocalStorage();
  const navigate = useNavigate();

  const {
    data: postData,
    isLoading: isPostLoading,
    refetch: postRefetch,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  const { data: commentsData, isLoading: isCommentsLoading } = useQuery({
    queryKey: ["comments", id, limit],
    queryFn: () => fetchComments(id, limit, cursor),
  });

  useEffect(() => {
    if (isCommentsLoading) return;

    setComments(commentsData.comments);
    setCursor(commentsData.nextCursor);
  }, [commentsData, isCommentsLoading]);

  const loadMore = async () => {
    try {
      const data = await fetchComments(id, limit, cursor);

      setComments((prev) => [...prev, ...data.comments]);
      setCursor(data.nextCursor);
    } catch (error) {
      console.error(error);
    }
  };

  if (isPostLoading || isCommentsLoading) {
    return <div>Loading...</div>;
  }

  const handleLike = async () => {
    if (!user) {
      navigate("/auth");
    }

    await fetchLikes(id, token);
  };

  function handleLimit(event) {
    setLimit(event.target.value);
    setCursor("");
  }

  if (comments.length == commentsData.totalCount) {
    setShowLoadMore((prev) => !prev);
  }

  const post = postData.post;
  const nextCursor = commentsData?.nextCursor;

  return (
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
            {post.author.username === user?.name ? "me" : post.author.username}
          </p>

          <Button
            variant="contained"
            onClick={() => {
              postRefetch();
              handleLike();
              setClickedIcon(!clickedIcon);
            }}
          >
            {clickedIcon ? <Favorite /> : <FavoriteBorder />}
            <p>{post.numberOfLikes}</p>
          </Button>
          <Button
            variant="contained"
            sx={{ p: "0 10px" }}
            onClick={() => {
              setShowComments(!showComments);
            }}
          >
            Comments
          </Button>
          <div className="comments-limit">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Comments limit</InputLabel>
              <Select
                value={limit}
                label="Comments limit"
                size="small"
                onChange={handleLimit}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      {comments.length > 0 ? (
        showComments ? (
          <div className="post-comments">
            {comments.map((comment) => (
              <div className="comment-card" key={comment.id} id={comment.id}>
                <Person fontSize="large" />
                <b className="comment-author">{comment.author.username}:</b>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
            {showLoadMore ? (
              <Button
                variant="contained"
                style={{ border: "1px solid gray" }}
                sx={{
                  ":hover": {
                    backgroundColor: "rgb(222, 222, 222)",
                    border: "1px solid gray",
                  },
                }}
                onClick={() => {
                  setCursor(nextCursor);
                  loadMore();
                }}
              >
                LoadMore
              </Button>
            ) : null}
          </div>
        ) : null
      ) : null}
    </div>
  );
}
