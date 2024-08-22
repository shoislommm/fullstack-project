/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Modal from "./Modal";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  getComments,
  createComment,
  deleteComment,
} from "../fetches/fetchComments";
import { addLike, getLikeById } from "../fetches/fetchLikes";
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
  Bookmark,
  BookmarkBorder,
  WestRounded,
  Person,
  Delete,
  AccountCircle,
} from "@mui/icons-material";
import { Input } from "@mui/joy";
import { getPostById, deletePost } from "../fetches/fetchPosts";
import { PostsContext } from "../context/PostsContext";
import MarkdownPreview from "../functions/MarkdownPreview";
import pushToast from "../functions/toast.js";
import { addToBookmarks, getBookmarkById } from "../fetches/fetchBookmarks.js";
import Loading from "./Loading";

export default function PostDetails() {
  const [isLiked, setIsLiked] = useState();
  const [numberOfLikes, setNumberOfLikes] = useState();
  const [loading, setLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [limit, setLimit] = useState(5);
  const [cursor, setCursor] = useState("");
  const { id } = useParams();
  const [token] = useLocalStorage();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { refetchPosts } = useContext(PostsContext);

  const { data: postData, isLoading: isPostLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const data = await getPostById(id);
      setNumberOfLikes(data.post.numberOfLikes);
      return data;
    },
    gcTime: 0,
    staleTime: 0,
  });

  const { data: commentsData, isLoading: isCommentsLoading } = useQuery({
    queryKey: ["comments", id, limit, cursor],
    queryFn: async () => {
      const data = await getComments(id, limit, cursor);
      setComments(data.comments);
      setCursor(data.nextCursor);
      return data;
    },
    gcTime: 0,
    staleTime: 0,
  });

  const { data: bookmarkData, isLoading: isBookmarkLoading } = useQuery({
    queryKey: ["bookmark", token, id],
    queryFn: async () => {
      const data = await getBookmarkById(token, id);
      setIsBookmarked(data.isBookmarked);
      return data;
    },
    gcTime: 0,
    staleTime: 0,
  });

  const { data: likeData, isLoading: isLikeLoading } = useQuery({
    queryKey: ["like", token, id],
    queryFn: async () => {
      const data = await getLikeById(token, id);
      setIsLiked(data.isLiked);
      return data;
    },
    gcTime: 0,
    staleTime: 0,
  });

  if (
    isPostLoading ||
    isCommentsLoading ||
    isBookmarkLoading ||
    isLikeLoading
  ) {
    return <Loading />;
  }

  if (!isBookmarked) {
    return;
  }

  const handleLoadMore = async () => {
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

  const handleDeletePost = async () => {
    try {
      await deletePost(id, token);
      await refetchPosts();

      pushToast("Post deleted!");

      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate("/auth");
    }

    isLiked
      ? setNumberOfLikes((prev) => prev - 1)
      : setNumberOfLikes((prev) => prev + 1);

    setIsLiked((prev) => !prev);

    const data = await addLike(token, id);

    if (!data.success) {
      return;
    }

    pushToast(data.message);
  };

  const handleBookmark = async () => {
    if (!user) {
      navigate("/auth");
    }

    setIsBookmarked((prev) => !prev);

    const data = await addToBookmarks(token, id);

    if (!data.success) {
      return;
    }

    pushToast(data.message);
  };

  function handleLimit(event) {
    setLimit(event.target.value);
    setCursor(null);
  }

  const handleCreateComment = async () => {
    try {
      setLoading(true);

      const data = await createComment(id, token, commentText);

      setComments((prev) => [data.comment, ...prev]);
      setCommentText("");

      pushToast("Comment added!");
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
      pushToast("Comment deleted!");
    } catch (error) {
      console.error(error);
    }
  };

  const post = postData.post;

  return (
    <div
      className="button-parent"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="post-buttons">
        <Button
          variant="contained"
          startIcon={<WestRounded />}
          onClick={() => navigate("/posts")}
        >
          Go Back
        </Button>
        {post.author.username === user?.name ? (
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              onClick={() => navigate(`/posts/update/${id}`)}
            >
              Update Post
            </Button>
            <Button variant="contained" onClick={() => handleDeletePost()}>
              Delete Post
            </Button>
          </div>
        ) : null}
      </div>
      <div className="post-details" key={post.id}>
        <h2 className="details-title"> {post.title}</h2>
        <div className="details-content">
          <MarkdownPreview markdown={post.content} />
        </div>
        <div className="details-info">
          <p className="username child card-user">
            <AccountCircle />
            {post.author.username === user?.name ? "me" : post.author.username}
          </p>
          <Button
            className="like-button child"
            variant="contained"
            onClick={() => {
              handleLike();
            }}
          >
            {isLiked ? <Favorite /> : <FavoriteBorder />}
            <p>{numberOfLikes}</p>
          </Button>
          <Button
            className="child"
            variant="contained"
            onClick={handleBookmark}
          >
            {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
          </Button>
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
            if (commentText?.trim?.() != "") {
              setIsDisabled(false);
            } else setIsDisabled(true);
          }}
          startDecorator={<Person fontSize="large" />}
          endDecorator={
            <Button
              className="comment-button"
              onClick={handleCreateComment}
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
              {comment.user.username === user.name
                ? "me"
                : comment.author.username}
              :
            </b>
            <p className="comment-text">{comment.text}</p>
            {comment.user.username === user.name ? (
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
        <div>
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
              handleLoadMore();
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
