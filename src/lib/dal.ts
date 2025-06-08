import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { isTokenExpired } from "@/middlewareUtils";
import { COOKIE_ACCESS_TOKEN } from "@/utils/cookiesConstants";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value;

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
  };
});
