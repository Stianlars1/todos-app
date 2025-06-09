import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { isTokenExpired } from "@/middlewareUtils";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_USER_TOKEN,
} from "@/utils/cookiesConstants";
import { AuthUser } from "@/types/auth";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value;
  const user = cookieStore.get(COOKIE_USER_TOKEN)?.value;

  if (!accessToken || isTokenExpired(accessToken)) {
    return {
      isAuth: false,
      user: null,
      accessToken: null,
    };
  }

  return {
    isAuth: true,
    accessToken,
    user: user ? (JSON.parse(user) as AuthUser) : null,
  };
});
