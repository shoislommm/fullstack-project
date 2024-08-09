import { Button } from "@mui/material";
import { WestRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Stack, Input, FormControl, Textarea, Box } from "@mui/joy";
import { createPost } from "../fetches/fetchPosts";
import { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import toast from "react-hot-toast";
import { PostsContext } from "../context/PostsContext";
import MarkdownPreview from "../functions/MarkdownPreview";

export default function CreatePost() {
  const { refetchPosts } = useContext(PostsContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [markdown, setMarkdown] = useState();
  const [token] = useLocalStorage();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsDisabled(true);
      const data = await createPost(token, title, markdown);
      navigate(`/posts/${data.post.id}`);

      toast("Post created!", {
        style: {
          margin: "5px",
          color: "black",
          backgroundColor: "white",
          border: "2px solid black",
          boxShadow: "5px 5px 5px black",
        },
      });
      await refetchPosts();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabled(false);
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
              border: "1.5px solid black",
              height: "40px",
            }}
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
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
            onChange={(event) => setDescription(event.target.value)}
          />
          <FormControl>
            <Textarea
              placeholder="Content"
              minRows={5}
              style={{ backgroundColor: "white", border: "1.5px solid black" }}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              endDecorator={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "var(--Textarea-paddingBlock)",
                    pt: "var(--Textarea-paddingBlock)",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    flex: "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => setShowPreview((prev) => !prev)}
                  >
                    Preview
                  </Button>
                </Box>
              }
            />
          </FormControl>
          <hr />
          {showPreview && (
            <div className="markdown">
              <MarkdownPreview markdown={markdown} />
            </div>
          )}

          <Button
            className="details-button"
            variant="contained"
            onClick={() => handleSubmit()}
            disabled={isDisabled}
          >
            Submit
          </Button>
        </Stack>
      </div>
    </div>
  );
}
