"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      error: e.message,
    };
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email: email,
        password: password,
        name: name,
      },
    });
    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
    };
  }
};

export const getCurrentUser = async () => {
  const requestedHeader = await headers();

  const session = await auth.api.getSession({
    headers: requestedHeader,
  });

  return session?.user ?? null;
};
