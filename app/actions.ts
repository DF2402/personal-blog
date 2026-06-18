"use server";
import { addVisitRecord } from "@/lib/ipRecord";
import { addDownloadRecord } from "@/lib/downloadRecord";
import { headers } from "next/headers";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encrypt } from "@/lib/session";

export async function trackVisit() {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  await addVisitRecord(ip);
}

export async function trackDownload() {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  await addDownloadRecord(ip);
}

export async function loginAction(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string;
  const password = formData.get("password") as string;

  if (!userId || !password) {
    return { error: "userId or password empty" };
  }
  const db = getDb();
  try {
    const user = await db("users").where({ userId }).first();

    if (!user) {
      return { error: "userId or password wrong" };
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return { error: "userId or password wrong" };
    }

    const sessionData = {
      userId: user.userId,
    };

    const token = await encrypt(sessionData);

    const cookieStore = await cookies();

    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
  } catch (err) {
    console.error("Database Error:", err);
    return { error: "server error" };
  }

  redirect("/admin");
}
