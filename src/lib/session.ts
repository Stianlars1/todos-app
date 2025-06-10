"use server";
import { cookies } from "next/headers";

import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_OPTIONS,
  COOKIE_REFRESH_TOKEN,
  COOKIE_SESSION_TOKEN,
  COOKIE_USER_TOKEN,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
  USER_TOKEN_COOKIE_MAX_AGE,
} from "@/utils/cookiesConstants";
import { AuthUser, AuthUserDTO } from "@/types/auth";

type AuthSession = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
};

export async function createSession(
  accessToken: string,
  refreshToken: string,
  user: AuthUserDTO,
) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_ACCESS_TOKEN, accessToken, COOKIE_OPTIONS);
  cookieStore.set(COOKIE_REFRESH_TOKEN, refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
  });

  cookieStore.set(
    COOKIE_SESSION_TOKEN,
    JSON.stringify({ accessToken, refreshToken }),
    {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
    },
  );

  cookieStore.set(COOKIE_USER_TOKEN, JSON.stringify(user), {
    ...COOKIE_OPTIONS,
    maxAge: USER_TOKEN_COOKIE_MAX_AGE,
  });
}

export async function getSession(): Promise<AuthSession> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value || null;
  const refreshToken = cookieStore.get(COOKIE_REFRESH_TOKEN)?.value || null;
  const userCookie = cookieStore.get(COOKIE_USER_TOKEN)?.value || null;
  const user = userCookie !== null ? JSON.parse(userCookie) : null;

  return { accessToken, refreshToken, user };
}

export async function deleteSession(calledFrom?: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_ACCESS_TOKEN, "", { path: "/", maxAge: 0 });
  cookieStore.set(COOKIE_REFRESH_TOKEN, "", { path: "/", maxAge: 0 });
  cookieStore.set(COOKIE_USER_TOKEN, "", { path: "/", maxAge: 0 });
  cookieStore.set("session", "", { path: "/", maxAge: 0 });
  console.info(`Session deleted${calledFrom ? ` from ${calledFrom}` : ""}`);
  return true;
}

export const deleteSessionBoolean = async () => {
  const cookieStore = await cookies();

  if (!cookieStore.get("session")) {
    return false;
  }
  cookieStore.set(COOKIE_ACCESS_TOKEN, "", { path: "/", maxAge: 0 });
  cookieStore.set(COOKIE_REFRESH_TOKEN, "", { path: "/", maxAge: 0 });
  cookieStore.set(COOKIE_USER_TOKEN, "", { path: "/", maxAge: 0 });
  cookieStore.set("session", "", { path: "/", maxAge: 0 });
  cookieStore.delete("session");
  return true;
};
