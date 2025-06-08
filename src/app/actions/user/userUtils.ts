import { decodeToken } from "../token";
import { DecryptedToken } from "../types";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import { ROUTE_ROOT } from "@/utils/urls";

export const getUserId = async () => {
  const { accessToken } = await verifySession();

  if (!accessToken) redirect(ROUTE_ROOT);
  const session = decodeToken(accessToken) as DecryptedToken;

  return session?.userId;
};
