/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import { WestRounded, ErrorOutline } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Stack,
  Input,
  FormControl,
  FormHelperText,
  Textarea,
  styled,
} from "@mui/joy";
import { getPostById, updatePost } from "../fetches/fetchPosts";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { PostsContext } from "../context/PostsContext";
import MarkdownPreview from "../functions/MarkdownPreview";
import pushToast from "../functions/toast";
import fetchImage from "../fetches/fetchImages";

export default function UpdatePost() {
  const { refetchPosts } = useContext(PostsContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [inputColor, setInputColor] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [imageForm, setImageForm] = useState(null);
  const [bannerForm, setBannerForm] = useState(null);
  const [banner, setBanner] = useState("");
  const [token] = useLocalStorage();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    refetch: refetchPost,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const post = data.post;

    setTitle(post.title);
    setDescription(post.description == null ? "" : post.description);
    setMarkdownContent(post.content);
    setBanner(post.banner);
  }, [data]);

  useEffect(() => {
    (async function handleImage() {
      try {
        if (imageForm) {
          const formData = new FormData();
          formData.append("image", imageForm);

          const data = await fetchImage(token, formData);
          setMarkdownContent((prev) =>
            `${prev} ${prev && "\n"} ![](http://localhost:4001/${
              data.image
            })`?.trim?.()
          );
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [imageForm]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("banner", bannerForm);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", markdownContent);
      setIsDisabled(true);

      const data = await updatePost(token, id, formData);

      if (!title || !markdownContent) {
        setError(data.message);
        setInputColor("danger");
        return;
      }

      await refetchPosts();
      await refetchPost();

      pushToast("Post updated!");
      navigate(`/posts/${id}`);
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
        onClick={() => navigate(`/posts/${id}`)}
      >
        Go Back
      </Button>
      <div className="post-details">
        <h1>Update Your Post</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Stack spacing={2} m="0 90px" pt="40px" pb="70px" width="400px">
            <Input
              sx={{
                ":focus-within": {
                  "--Input-focusedHighlight": "2px solid black",
                },
                backgroundColor: "white",
                border: `1.5px solid ${inputColor ? "#c41c1c" : "black"}`,
                height: 40,
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
                height: 40,
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
            <FormControl>
              <Textarea
                sx={{
                  ":focus-within": {
                    "--Textarea-focusedHighlight": `1.5px solid black`,
                  },

                  minHeight: "100px",
                  height: "auto",
                  backgroundColor: "white",
                  border: `1.5px solid ${inputColor ? "#c41c1c" : "black"}`,
                  color: inputColor
                    ? "var(--variant-outlinedColor, var(--joy-palette-danger-outlinedColor, var(--joy-palette-danger-500, #C41C1C)))"
                    : "black",
                }}
                variant="soft"
                placeholder="Content*"
                value={markdownContent}
                onChange={(e) => {
                  setMarkdownContent(e.target.value);
                }}
              />
            </FormControl>
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                component="label"
                variant="contained"
                sx={{
                  width: 100,
                  margin: "0 10px",
                  color: "black",
                  backgroundColor: "white",
                  border: "2px solid black",
                  boxShadow: " 5px 5px 5px black",
                  ":hover": { backgroundColor: "#c0c0c0" },
                }}
              >
                Img
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setImageForm(e.target.files[0]);
                  }}
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target?.files?.[0]) {
                    setBannerForm(e.target.files[0]);
                    setBanner(URL.createObjectURL(e.target.files[0]));
                  } else {
                    setBannerForm(null);
                    setBanner(null);
                  }
                }}
                sx={{
                  ":focus-within": {
                    "--Input-focusedHighlight": "2px solid black",
                  },
                  backgroundColor: "white",
                  border: "1.5px solid black",
                  height: 40,
                }}
                style={{ display: "none" }}
                id="contained-button-file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    border: "2px solid black",
                    boxShadow: " 5px 5px 5px black",
                    ":hover": { backgroundColor: "#c0c0c0" },
                  }}
                >
                  Upload Banner
                </Button>
              </label>
            </div>
            {banner ? (
              <img
                src={
                  banner.includes("blob")
                    ? banner
                    : `http://localhost:4001/${banner}`
                }
              />
            ) : null}
          </Stack>
          {showPreview ? (
            <Stack spacing={2} m="0 90px" pt="40px" pb="70px" width="400px">
              <>
                <hr />
                <div className="markdown">
                  <MarkdownPreview markdown={markdownContent} />
                </div>
                <hr />
              </>
            </Stack>
          ) : null}
        </div>
      </div>
    </div>
  );
}
