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
