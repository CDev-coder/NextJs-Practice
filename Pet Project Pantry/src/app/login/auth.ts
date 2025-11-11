// app/lib/auth.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// Example: mock or real API call
export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await fetch("/api/auth/me", {
      credentials: "include", // important if using cookies
    });

    if (!res.ok) return null;

    const user: User = await res.json();
    return user;
  } catch (err) {
    console.error("Failed to fetch current user", err);
    return null;
  }
}
