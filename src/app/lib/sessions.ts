import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { decodeToken } from "../actions/actionUtils";
import { DecryptedToken } from "../actions/types";

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  cookies().set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
export async function deleteSession() {
  cookies().delete("session");
}

export async function decryptSession(
  session: string | undefined = ""
): Promise<DecryptedToken | null> {
  try {
    const decryptedToken = decodeToken(session);
    return decryptedToken;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}

export const verifySession = cache(async () => {
  const tokenCookie = cookies().get("session")?.value;
  console.log("\n\n== tokenCookie", tokenCookie);
  const session = await decryptSession(tokenCookie);
  console.log("\n\n== session", session);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});
export const checkAuthentication = cache(async () => {
  const tokenCookie = cookies().get("session")?.value;
  const session = await decryptSession(tokenCookie);

  if (!session?.userId) {
    return false;
  }

  return true;
});
