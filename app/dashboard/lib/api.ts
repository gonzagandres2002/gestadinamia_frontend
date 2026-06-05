export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class UnauthorizedError extends Error {
  constructor() {
    super("Sesión expirada");
    this.name = "UnauthorizedError";
  }
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("gestadinamia_token");
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers || {});
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("gestadinamia_token");
      localStorage.removeItem("gestadinamia_role");
      window.location.href = "/login";
    }
    throw new UnauthorizedError();
  }

  if (!res.ok) {
    const detail = await res
      .json()
      .then((d) => d.detail || `Error ${res.status}`)
      .catch(() => `Error ${res.status}`);
    throw new Error(detail);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export function logout() {
  localStorage.removeItem("gestadinamia_token");
  localStorage.removeItem("gestadinamia_role");
  window.location.href = "/login";
}
