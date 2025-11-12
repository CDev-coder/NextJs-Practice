export interface User {
  id: string;
  name: string;
  email: string;
}

// Fetch currently logged-in user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export interface LoginData {
  email: string;
  password: string;
}

// Call login API
export async function login({ email, password }: LoginData) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

// Call register API
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Call register API
export async function register({ name, email, password }: RegisterData) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}
