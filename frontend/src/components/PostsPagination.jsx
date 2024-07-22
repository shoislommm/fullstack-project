import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";
import { Pagination } from "@mui/material";

export default function PostsPagination() {
  const { page, totalPages, handlePagination } = useContext(PostsContext);

  return (
    <div className="posts-pagination">
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePagination}
        variant="text"
        shape="rounded"
        size="large"
        showFirstButton
        showLastButton
      />
    </div>
  );
}
