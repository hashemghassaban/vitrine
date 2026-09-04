const configuredApiBase =
  import.meta.env.VITE_API_TARGET ||
  import.meta.env.VITE_API_BASE_URL ||
  "https://admin.vitrine.gallery";

// Accept both `https://host` and `https://host/api` in environment files.
const API_BASE = configuredApiBase.replace(/\/$/, "").replace(/\/api$/, "");

interface ApiResult<T> {
  success?: boolean;
  data?: T;
}

export async function fetchApiData<T>(path: string, lang: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE}/api${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    });

    if (!response.ok) return null;

    const json = (await response.json()) as ApiResult<T>;
    return json.data ?? null;
  } catch {
    return null;
  }
}
