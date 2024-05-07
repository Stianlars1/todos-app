"use server";
import { redirect } from "next/navigation";
import { deleteSession } from "../session";

export const logout = async () => {
  console.log("\n\n\n\n\n 🟢 ===  logout called === ");
  deleteSession();
  redirect("/login");
};
