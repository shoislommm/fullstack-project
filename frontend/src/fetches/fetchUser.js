export default async function fetchUser(token) {
  const response = await fetch("http://localhost:4001/api/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
    },
  });

  const data = await response.json();

  if (data?.success === false) {
    console.log(data.message);
    return data;
  }

  return data;
}
