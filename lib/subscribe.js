export async function subscribe({ email, message }) {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, message }),
  });

  return await response.json();
}
