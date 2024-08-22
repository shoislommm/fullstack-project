export async function getPosts(page, limit, search) {
  const response = await fetch(
    `http://localhost:4001/api/posts/?page=${page}&limit=${limit}&search=${search}`
  );

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }
  const data = await response.json();
  return data;
}

export async function createPost(token, formData) {
  const response = await fetch(`http://localhost:4001/api/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.success === false) {
    console.log(data.message);
    return data;
  }

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }
  const data = await response.json();

  return data;
}

export async function getPostById(id) {
  const response = await fetch(`http://localhost:4001/api/posts/${id}`);

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }

  const data = await response.json();

  return data;
}

export async function getPostsByUserId(token) {
  const response = await fetch(`http://localhost:4001/api/user/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }

  const data = await response.json();

  return data;
}

export async function updatePost(token, id, formData) {
  try {
    const response = await fetch(`http://localhost:4001/api/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`fetch not ok`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message)
  }
}

export async function deletePost(postId, token) {
  const response = await fetch(`http://localhost:4001/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response?.success === false) {
    console.log(data.message);
    return data;
  }

  const data = await response.json();

  return data;
}
