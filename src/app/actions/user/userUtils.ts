import { cookies } from "next/headers";
import { decodeToken } from "../token";
import { DecryptedToken } from "../types";

export const getUserId = async () => {
  const token: string | undefined = cookies().get("session")?.value!;
  const session = decodeToken(token) as DecryptedToken;

  return session?.userId;
};
