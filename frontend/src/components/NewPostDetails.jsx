import { Button } from "@mui/material";
import { WestRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Stack, Input } from "@mui/joy";
import { createPost } from "../fetches/fetchPosts";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import toast from "react-hot-toast";

export default function NewPostDetails() {
  const [token] = useLocalStorage();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsDisabled(true);
      const data = await createPost(token, title, content);
      console.log(data);
      toast("Post created!", {
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
        <h1>Create Your Post </h1>
        <Stack spacing={3} pt="40px" pb="70px" width="250px">
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
            placeholder="Content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
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
