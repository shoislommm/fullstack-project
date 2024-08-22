export default async function fetchImage(token, formData) {
    const response = await fetch(`http://localhost:4001/api/posts/images`, {
        method: "POST",
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
}
