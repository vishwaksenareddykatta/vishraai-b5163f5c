/**
 * Tiny fetch helper pointing at the Vishra Express API.
 * Configure with VITE_API_BASE_URL (e.g. https://api.vishra.ai).
 * Defaults to http://localhost:8080 for local dev on your Ubuntu server.
 */
export const API_BASE: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:8080";

export async function apiPost<T = unknown>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data: any = null;
  try { data = await res.json(); } catch {}
  if (!res.ok || (data && data.ok === false)) {
    const msg = (data && (data.error || data.message)) || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}
