"use server";
import { addVisitRecord } from "@/lib/ipRecord";
import { addDownloadRecord } from "@/lib/downloadRecord";
import { headers } from "next/headers";

export async function trackVisit() {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  await addVisitRecord(ip);
}

export async function trackDownload() {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  await addDownloadRecord(ip);
}
