interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Paymethods {
  creditcard: CreditInfo;
  paypal: PayPalInfo;
  giftCard: GiftCardInfo;
}

interface CreditInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface GiftCardInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface PayPalInfo {
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: Address | null;
  paymentMethod?: Paymethods;
}

/* ---------- AUTH ---------- */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await fetch("/api/auth/me", {
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      address: data.address ?? null,
    };
  } catch {
    return null;
  }
}

export interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  address?: Address;
  paymentMethod?: Paymethods;
}

export async function register(data: RegisterData) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}
