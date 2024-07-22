export default async function fetchPost() {
  try {
    const response = await fetch(
      `http://localhost:4001/api/posts/b62c5169-0328-4f1b-929a-d78eadf18126`
    );

    if (!response.ok) {
      throw new Error(`fetch not ok`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error message:", error);
    throw error;
  }
}
