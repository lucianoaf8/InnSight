const BASE_URL =
  import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://your-pythonanywhere-url/api";

export async function apiRequest(
  path: string,
  method = "GET",
  data?: any,
  token?: string
) {
  const headers: any = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return await response.json();
}
