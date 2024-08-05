export async function getComments(id, limit, cursor) {
  const response = await fetch(
    `http://localhost:4001/api/posts/${id}/comments/?limit=${limit}&cursor=${
      cursor ?? ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (data?.success === false) {
    console.log(data.message);
    return data;
  }

  return data;
}

export async function createComment(id, token, text) {
  const response = await fetch(
    `http://localhost:4001/api/posts/${id}/comments/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: text }),
    }
  );

  const data = await response.json();

  if (data?.success === false) {
    console.log(data.message);
    return data;
  }

  return data;
}

export async function deleteComment(postId, commentId, token) {
  const response = await fetch(
    `http://localhost:4001/api/posts/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (data?.success === false) {
    console.log(data.message);
    return data;
  }

  return data;
}
