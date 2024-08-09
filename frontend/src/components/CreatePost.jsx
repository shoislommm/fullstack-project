import { Button } from "@mui/material";
import { WestRounded, ErrorOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Input,
  FormControl,
  FormHelperText,
  Textarea,
  styled,
} from "@mui/joy";
import { createPost } from "../fetches/fetchPosts";
import { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { PostsContext } from "../context/PostsContext";
import MarkdownPreview from "../functions/MarkdownPreview";
import pushToast from "../functions/toast";

export default function CreatePost() {
  const { refetchPosts } = useContext(PostsContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [inputColor, setInputColor] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [image, setImage] = useState();
  const [token] = useLocalStorage();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsDisabled(true);
      const data = await createPost(token, title, description, markdownContent);
      console.log(title);
      console.log(markdownContent);

      if (!title && !markdownContent) {
        setError(data.message);
        setInputColor("danger");
        return;
      }
      console.log(data);
      navigate(`/posts/${data.post.id}`);

      pushToast("Post created!");
      await refetchPosts();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabled(false);
    }
  };

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  console.log(image);

  return (
    <div
      className="button-parent"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        className="details-button"
        variant="contained"
        startIcon={<WestRounded />}
        onClick={() => navigate("/posts")}
      >
        Go Back
      </Button>
      <div className="post-details">
        <h1>Create Your Post</h1>
        <Stack spacing={3} pt="40px" pb="70px" width="400px">
          <Input
            sx={{
              ":focus-within": {
                "--Input-focusedHighlight": "2px solid black",
              },
              backgroundColor: "white",
              border: `1.5px solid ${inputColor ? "#c41c1c" : "black"}`,
              height: "40px",
            }}
            color={inputColor}
            placeholder="Title*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            sx={{
              ":focus-within": {
                "--Input-focusedHighlight": "2px solid black",
              },
              backgroundColor: "white",
              border: "1.5px solid black",
              height: "40px",
            }}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && (
            <FormControl color={inputColor}>
              <FormHelperText sx={{ fontSize: "15px" }}>
                <ErrorOutline
                  className="error-svg"
                  sx={{ paddingRight: "10px" }}
                />
                {error}
              </FormHelperText>
            </FormControl>
          )}
          {showPreview ? (
            <>
              <hr />
              <div
                className="markdown"
                style={{ margin: 0, textAlign: "center" }}
              >
                <MarkdownPreview markdown={markdownContent} />
              </div>
              <hr />
            </>
          ) : (
            <FormControl>
              <Textarea
                sx={{
                  ":focus-within": {
                    "--Textarea-focusedHighlight": `1.5px solid black`,
                  },
                  height: "200px",
                  backgroundColor: "white",
                  border: `1.5px solid ${inputColor ? "#c41c1c" : "black"}`,
                }}
                color={inputColor}
                variant="soft"
                placeholder="Content*"
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
              />
            </FormControl>
          )}
          <div style={{ margin: 20 }}>
            <Button
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "2px solid black",
                margin: "0 10px",
                boxShadow: " 5px 5px 5px black",
                ":hover": { backgroundColor: "#c0c0c0" },
              }}
              component="label"
              variant="contained"
            >
              file
              <VisuallyHiddenInput
                type="file"
                value={image}
                onChange={(e) => console.log(e.target.files[0])}
              />
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowPreview((prev) => !prev)}
            >
              Preview
            </Button>
            <Button
              className="details-button"
              variant="contained"
              onClick={() => handleSubmit()}
              disabled={isDisabled}
            >
              Submit
            </Button>
          </div>
        </Stack>
      </div>
    </div>
  );
}
