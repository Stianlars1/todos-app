"use server";
import { cookies } from "next/headers";
import { cache } from "react";
import { isValid } from "./token";

export const verifyAuthentication = cache(async () => {
  const accessToken = cookies().get("session")?.value;
  return await isValid(accessToken);
});
