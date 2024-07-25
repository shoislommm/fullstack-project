export default async function fetchLikes(id, token) {
  const response = await fetch(`http://localhost:4001/api/posts/${id}/likes`, {
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
