const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) throw new Error('Request failed');
  return response.json();
}
