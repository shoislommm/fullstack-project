export async function fetchLogin(username, password) {
  const response = await fetch("http://localhost:4001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });

  const data = await response.json();

  if (data?.success === false) {
    console.log(data.message);
    return data;
  }

  return data;
}

export async function fetchRegister(username, password) {
  const response = await fetch("http://localhost:4001/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });

  const data = await response.json();

  if (data?.success === false) {
    console.log(data.message);
    return data;
  }

  return data;
}
