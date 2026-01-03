"use server";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import { ROUTE_SIGN_IN } from "@/utils/urls";

export const getUserId = async () => {
  const { user } = await verifySession();

  if (!user) redirect(ROUTE_SIGN_IN);

  return user.id;
};
