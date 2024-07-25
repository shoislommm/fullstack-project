export default async function fetchComments(id, limit, cursor) {
  const response = await fetch(
    `http://localhost:4001/api/posts/${id}/comments/?limit=${limit}&cursor=${cursor}`,
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
