export async function subscribe({ email, message }) {
  try {
    const response = await fetch("/api/subscrib", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, message }),
    });

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}
