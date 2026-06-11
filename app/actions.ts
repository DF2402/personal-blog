"use server";
import { addRecord } from "@/lib/ipRecord";
import { headers } from "next/headers";

export async function trackVisit() {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  await addRecord(ip);
}
