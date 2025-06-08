"use server";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";
import { ROUTE_LOGIN } from "@/utils/urls";

export const logout = async () => {
  await deleteSession();
  redirect(ROUTE_LOGIN);
};
