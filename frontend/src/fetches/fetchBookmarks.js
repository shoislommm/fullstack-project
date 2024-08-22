export async function getBookmarks(token) {
  const response = await fetch(
    `http://localhost:4001/api/bookmarks`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }

  const data = await response.json();

  return data;
}


export async function addToBookmarks(token, postId) {
  const response = await fetch(
    `http://localhost:4001/api/bookmarks/${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ postId: id }),
    }
  );

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }

  const data = await response.json();

  return data;
}

export async function getBookmarkById(token, postId) {
  const response = await fetch(
    `http://localhost:4001/api/bookmarks/${postId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }

  const data = await response.json();

  return data;
}
