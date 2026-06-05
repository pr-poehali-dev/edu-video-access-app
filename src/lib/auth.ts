const AUTH_URL = "https://functions.poehali.dev/f7c7773c-c990-4dad-9599-a99f1a3a2bc0";
const TOKEN_KEY = "learnx_token";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar_letter: string;
  level: string;
  streak_days: number;
  hours_studied: number;
  videos_watched: number;
  courses_started: number;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(action: string, method: string, body?: object, token?: string) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["X-Session-Token"] = token;
  const res = await fetch(`${AUTH_URL}/?action=${action}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export async function register(name: string, email: string, password: string): Promise<{ token: string; user: User } | { error: string }> {
  return request("register", "POST", { name, email, password });
}

export async function login(email: string, password: string): Promise<{ token: string; user: User } | { error: string }> {
  return request("login", "POST", { email, password });
}

export async function getProfile(token: string): Promise<{ user: User } | { error: string }> {
  return request("profile", "GET", undefined, token);
}

export async function logout(token: string): Promise<void> {
  await request("logout", "POST", undefined, token);
  clearToken();
}
