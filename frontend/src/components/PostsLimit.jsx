import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";

export default function PostsLimit() {
  const { limit, handleLimit } = useContext(PostsContext);

  return (
    <div className="posts-limit">
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Limit</InputLabel>
        <Select value={limit} label="Limit" size="small" onChange={handleLimit}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
