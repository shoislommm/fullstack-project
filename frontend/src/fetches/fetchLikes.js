export async function getLikeById(token, postId) {
  const response = await fetch(`http://localhost:4001/api/posts/${postId}/likes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }

  const data = await response.json();

  return data;
}

export async function addLike(token, postId) {
  const response = await fetch(`http://localhost:4001/api/posts/${postId}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }

  const data = await response.json();

  return data;
}
