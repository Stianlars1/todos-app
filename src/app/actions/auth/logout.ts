"use server";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";

export const logout = async () => {
  deleteSession();
  redirect("/login");
};
