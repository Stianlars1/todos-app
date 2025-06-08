"use server";
import { cookies } from "next/headers";

import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_OPTIONS,
  COOKIE_REFRESH_TOKEN,
  COOKIE_SESSION_TOKEN,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
} from "@/utils/cookiesConstants";
import { decodeToken } from "@/app/actions/token";
import { DecryptedToken, TokenType } from "@/app/actions/types";

//
/* === SESSION ACTIONS ===  */

// Crea

export async function createSession(accessToken: string, refreshToken: string) {
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
}

// decrypt session ( Get the decoded accessToken's information ie: userId, firstName, exp, etc...)
export async function decryptSession(
  accessToken: string | undefined = "",
): Promise<DecryptedToken | null> {
  try {
    const data = decodeToken(accessToken) as DecryptedToken;
    if (data && "userId" in data) {
      return data;
    }
    console.warn("Invalid token structure, 'userId' not found.");
    return null;
  } catch (error) {
    console.error("Error decrypting token: ", error);
    return null;
  }
}

export async function deleteSession(calledFrom?: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_ACCESS_TOKEN, "", { path: "/", maxAge: 0 });
  cookieStore.set(COOKIE_REFRESH_TOKEN, "", { path: "/", maxAge: 0 });
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
  cookieStore.set("session", "", { path: "/", maxAge: 0 });
  cookieStore.delete("session");
  return true;
};
//
//
//
//
//
//
//
//
//
//
//
/* === Token ACTIONS ===  */
export const getToken = async () => {
  const tokens = (await cookies()).get("session")?.value;

  if (!tokens) {
    console.warn("No tokens found in cookies");
    return undefined;
  }

  const accessToken = (JSON.parse(tokens) as TokenType).accessToken;

  return { accessToken };
};
