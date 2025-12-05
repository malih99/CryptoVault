export type FetchJsonOptions = RequestInit & {
  fallback?: unknown;
  enforceJson?: boolean;
};

function isJsonContentType(ct: string | null): boolean {
  if (!ct) return false;
  return ct.toLowerCase().includes("application/json");
}

async function safeParseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      `Response is not valid JSON (status ${res.status}): ${text.slice(0, 120)}`
    );
  }
}

export async function fetchJson<T>(
  url: string,
  options: FetchJsonOptions = {}
): Promise<T> {
  const { fallback, enforceJson = true, ...init } = options;

  try {
    const res = await fetch(url, init);

    if (!res.ok) {
      // 4xx/5xx
      if (fallback !== undefined) return fallback as T;
      throw new Error(`HTTP ${res.status} for ${url}`);
    }

    const ct = res.headers.get("content-type");
    if (enforceJson && !isJsonContentType(ct)) {
      if (fallback !== undefined) return fallback as T;
      throw new Error(
        `Unexpected content-type "${ct}" for ${url} (expected JSON)`
      );
    }

    return await safeParseJson<T>(res);
  } catch (err) {
    if (fallback !== undefined) return fallback as T;
    throw err;
  }
}
