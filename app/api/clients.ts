import PayLoad from "@/app/models/expression";
import User from "@/app/models/user";

export type DiffResponse = {
  derivative: string;
  img_path: string;
};

export type AuthResponse = {
  message: string;
};

export const createPost = async (payload: PayLoad): Promise<DiffResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/expression`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};

export const signUp = async (payload: User): Promise<AuthResponse> => {
  const response = await fetch(
    `/api/backend/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};

export const signIn = async (payload: User): Promise<AuthResponse> => {
  const response = await fetch(
    `/api/backend/signin`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};