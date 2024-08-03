"use server";
import { redirect } from "next/navigation";
import { deleteSession } from "../session";

export const logout = async () => {
  deleteSession();
  redirect("/login");
};
