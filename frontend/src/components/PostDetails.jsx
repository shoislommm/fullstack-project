/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Modal from "./Modal";
import useLocalStorage from "../hooks/useLocalStorage";
import fetchPost from "../fetches/fetchPost";
import {
  getComments,
  createComment,
  deleteComment,
} from "../fetches/fetchComments";
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
  Delete,
} from "@mui/icons-material";
import { Input } from "@mui/joy";
import toast from "react-hot-toast";
import { deletePost } from "../fetches/fetchPosts";

export default function PostDetails() {
  const [clickedIcon, setClickedIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showModal, setShowModal] = useState(false);
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
    queryFn: () => getComments(id, limit, null),
  });

  useEffect(() => {
    if (isCommentsLoading) return;

    setComments(commentsData.comments);
    setCursor(commentsData.nextCursor);
  }, [commentsData, isCommentsLoading]);

  const loadMore = async () => {
    setLoading(true);

    try {
      const data = await getComments(id, limit, cursor);

      setComments((prev) => [...prev, ...data.comments]);
      setCursor(data.nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isPostLoading || isCommentsLoading) {
    return;
  }

  const handleDeletePost = async () => {
    try {
      const data = await deletePost(id, token);
      console.log(data);
      toast("Post deleted!", {
        style: {
          margin: "5px",
          color: "black",
          backgroundColor: "white",
          border: "2px solid black",
          boxShadow: "5px 5px 5px black",
        },
      });
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate("/auth");
    }

    await fetchLikes(id, token);
  };

  function handleLimit(event) {
    setLimit(event.target.value);
    setCursor(null);
  }

  const post = postData.post;

  const handleCreateComment = async () => {
    setLoading(true);

    try {
      const data = await createComment(id, token, commentText);
      setComments((prev) => [data.comment, ...prev]);
      setCommentText("");
      toast("Comment added!", {
        style: {
          margin: "5px",
          color: "black",
          backgroundColor: "white",
          border: "2px solid black",
          boxShadow: "5px 5px 5px black",
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(id, commentId, token);
      setComments(comments.filter((comment) => comment.id !== commentId));
      toast("Comment deleted!", {
        style: {
          margin: "5px",
          color: "black",
          backgroundColor: "white",
          border: "2px solid black",
          boxShadow: "5px 5px 5px black",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="button-parent"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="test">
        <Button
          variant="contained"
          startIcon={<WestRounded />}
          onClick={() => navigate("/posts")}
        >
          Go Back
        </Button>
        {post.author.username === user?.name ? (
          <Button variant="contained" onClick={() => handleDeletePost()}>
            Delete Post
          </Button>
        ) : null}
      </div>
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
      <div className="post-comments">
        <Input
          sx={{
            p: "0",
            ":focus-within": {
              "--Input-focusedHighlight": "2px solid black",
            },
          }}
          type="text"
          value={commentText}
          variant="plain"
          className="comment-card"
          placeholder="Add a comment..."
          onChange={(event) => {
            setCommentText(event.target.value);
            console.log(commentText);
            if (commentText?.trim?.() != "") {
              setIsDisabled(false);
            } else setIsDisabled(true);
          }}
          startDecorator={<Person fontSize="large" />}
          endDecorator={
            <Button
              className="comment-button"
              onClick={() => handleCreateComment()}
              disabled={isDisabled}
            >
              comment
            </Button>
          }
        />
        {comments.map((comment) => (
          <div className="comment-card" key={comment.id} id={comment.id}>
            <Person fontSize="large" />
            <b className="comment-author">
              {comment.author.username === user?.name
                ? "me"
                : comment.author.username}
              :
            </b>
            <p className="comment-text">{comment.text}</p>
            {comment.author.username === user?.name ? (
              <Delete
                onClick={() => {
                  setCommentId(comment.id);
                  setShowModal(true);
                }}
              />
            ) : null}
          </div>
        ))}
        {showModal ? (
          <Modal>
            <div>
              <h1>Delete comment permanently?</h1>
              <div className="button-parent">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleDeleteComment(commentId);
                    setCommentId("");
                    setShowModal(false);
                  }}
                >
                  Yes
                </Button>
                <Button variant="contained" onClick={() => setShowModal(false)}>
                  No
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}
        {cursor && (
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
              loadMore();
            }}
            disabled={loading}
          >
            LoadMore
          </Button>
        )}
      </div>
    </div>
  );
}
