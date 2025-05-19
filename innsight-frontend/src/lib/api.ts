import { auth } from './firebase';

const BASE_URL =
  import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://your-pythonanywhere-url/api";

/**
 * Gets the current user's ID token
 * @returns Firebase ID token or null if not authenticated
 */
async function getIdToken(): Promise<string | null> {
  try {
    if (!auth.currentUser) {
      return null;
    }
    return await auth.currentUser.getIdToken();
  } catch (error) {
    console.error("Error getting ID token:", error);
    return null;
  }
}

/**
 * Makes an authenticated API request
 * @param path The API endpoint path
 * @param method HTTP method (GET, POST, etc.)
 * @param data Optional data payload for POST/PUT requests
 * @param forceToken Optional token override (normally auto-fetched)
 * @returns Response data
 */
export async function apiRequest(
  path: string,
  method = "GET",
  data?: any,
  forceToken?: string
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  // Automatically get the token or use forceToken if provided
  const token = forceToken || await getIdToken();
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
