export default async function fetchPosts(page, limit) {
  const response = await fetch(
    `http://localhost:4001/api/posts/?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }
  const data = await response.json();
  return data;
}

export async function createPost(token, title, content) {
  const response = await fetch(`http://localhost:4001/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: title, content: content }),
  });

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }
  const data = await response.json();
  return data;
}

export async function deletePost(postId, token) {
  const response = await fetch(`http://localhost:4001/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data?.success === false) {
    console.log(data.message);
    return data;
  }

  return data;
}
