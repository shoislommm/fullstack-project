export default async function fetchPost(id) {
  const response = await fetch(`http://localhost:4001/api/posts/${id}`);

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }
  const data = await response.json();

  return data;
}
