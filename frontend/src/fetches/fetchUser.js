export default async function fetchUser(token, tokenFrom) {
  const response = await fetch("http://localhost:4001/api/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "TokenFrom": tokenFrom
    },
  });

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }

  const data = await response.json();

  console.log(data)

  if (data?.success === false) {
    console.log(data.message);
    return data;
  }

  return data;
}
