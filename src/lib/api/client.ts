export async function fetchJson<T = unknown>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(url, init);

  const contentType = res.headers.get("content-type") || "";
  const isJson =
    contentType.includes("application/json") || contentType.includes("+json");

  // Read as text once (so we can show helpful errors if JSON parsing fails)
  const raw = await res.text();

  if (!res.ok) {
    const preview = raw.slice(0, 200).replace(/\s+/g, " ");
    throw new Error(`HTTP ${res.status} on ${url}: ${preview}`);
  }

  if (!isJson) {
    // Typical dev case: server returned HTML (e.g., 200 + index.html)
    const preview = raw.slice(0, 200).replace(/\s+/g, " ");
    throw new Error(
      `Invalid content-type for ${url}. Expected JSON, got: "${contentType}". Body preview: ${preview}`
    );
  }

  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    const preview = raw.slice(0, 200).replace(/\s+/g, " ");
    throw new Error(
      `Failed to parse JSON from ${url}. Body preview: ${preview}`
    );
  }
}
