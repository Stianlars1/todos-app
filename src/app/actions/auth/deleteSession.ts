"use server";
import { deleteSessionBoolean as deleteSessionBooleanServer } from "@/lib/session";

export const deleteSessionBoolean = async () => deleteSessionBooleanServer();
