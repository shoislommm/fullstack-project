import { useContext } from "react";
import { Stack, Input } from "@mui/joy";
import { Button } from "@mui/material";
import { SearchPostsContext } from "../context/SearchPostsContext";

export default function SearchPosts() {
  const { requestParams, setRequestParams, handleSearch } =
    useContext(SearchPostsContext);

  return (
    <div className="button-parent input-search">
      <Stack sx={{ ml: "95px" }}>
        <Input
          sx={{
            height: "45px",
            width: "600px",
            pr: "5px",
          }}
          variant="plain"
          type="text"
          placeholder="Search"
          endDecorator={
            <Button
              className="search-button"
              variant="contained"
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </Button>
          }
          onChange={(event) => setRequestParams(event.target.value)}
          value={requestParams}
        />
      </Stack>
    </div>
  );
}
