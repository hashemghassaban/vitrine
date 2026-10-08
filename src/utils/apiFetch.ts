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
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(`${API_BASE}/api${path}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": lang,
        },
      });

      if (response.ok) {
        const json = (await response.json()) as ApiResult<T>;
        return json.data ?? null;
      }

      if (![500, 502, 503, 504].includes(response.status)) return null;
    } catch {
      // Network errors are retried below as well.
    }

    if (attempt < 2) {
      await new Promise((resolve) =>
        setTimeout(resolve, attempt === 0 ? 300 : 800),
      );
    }
  }

  return null;
}
