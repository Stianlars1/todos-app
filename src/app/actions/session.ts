"use server";
import { APPLICATION_JSON_V1, HTTP_REQUEST } from "@/utils/fetch/fetch";
import { API_REFRESH_TOKEN_URL } from "@/utils/urls";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { decodeToken, isTokenExpired } from "./token";
import {
  DecryptedToken,
  SessionType,
  TokenType,
  authResponseDTO,
} from "./types";

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
/* === SESSION ACTIONS ===  */

// Create
export async function createSession(tokens: TokenType) {
  // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const expiresAt = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10 hours

  cookies().set("session", JSON.stringify(tokens), {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// Verify
export const verifySession = cache(async () => {
  const token: string | undefined = cookies().get("session")?.value;
  const session = await decryptSession(token);
  if (!token || !session) {
    try {
      await deleteSession();
    } catch (error) {
      console.error("Error deleting session: ", error);
    }

    return redirect("/login");
  }
  const tokens = await JSON.parse(token);

  if (token && (await isTokenExpired(tokens.accessToken))) {
    console.info("Token expired, requesting new token");
    const refreshToken = tokens.refreshToken;
    const requestNewTokenresponse = await fetch(API_REFRESH_TOKEN_URL, {
      method: HTTP_REQUEST.POST,
      headers: APPLICATION_JSON_V1,
      body: JSON.stringify({ token: refreshToken }),
    });

    if (!requestNewTokenresponse.ok) {
      console.error("Error requesting new token: ", requestNewTokenresponse);
      await deleteSession();
      return redirect("/login");
    }
    const newToken: authResponseDTO = await requestNewTokenresponse.json();

    const newRefreshToken = (newToken as authResponseDTO).data.refreshToken;
    const newAccessToken = (newToken as authResponseDTO).data.accessToken;
    const newTokens: TokenType = {
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
    };
    await createSession(newTokens);
  }

  return {
    isAuth: true,
    userId: session.userId,
    token: JSON.parse(token),
    session: session as SessionType,
  };
});

// decrypt session ( Get the decoded accessToken's information ie: userId, firstName, exp, etc...)
export async function decryptSession(
  session: string | undefined = ""
): Promise<DecryptedToken | null> {
  try {
    const decryptedToken =
      "userId" in (decodeToken(session) as DecryptedToken)
        ? (decodeToken(session) as DecryptedToken)
        : null;

    return decryptedToken;
  } catch (error) {
    return null;
  }
}

// Delete
export const deleteSession = async () => {
  if (!cookies().get("session")) {
    return;
  }
  cookies().delete("session");
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
  const tokens = cookies().get("session")?.value;

  if (!tokens) {
    console.warn("No tokens found in cookies");
    return undefined;
  }

  const accessToken = (JSON.parse(tokens) as TokenType).accessToken;

  return { accessToken };
};
