"use server";
import { permanentRedirect } from "next/navigation";
import { deleteSession } from "@/lib/session";
import { ROUTE_LOG_OUT } from "@/utils/urls";

export const logout = async () => {
  await deleteSession("logout.ts");
  permanentRedirect(ROUTE_LOG_OUT);
};
