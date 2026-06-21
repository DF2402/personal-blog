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
  const userId = parseInt(formData.get("userId") as string, 10);
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

export async function getTrafficTrends() {
  const db = getDb();
  const rawData = await db.raw(`
    WITH DailyCounts AS (
      SELECT 
        DATE(created_at) as visit_date,
        COUNT("ipId") as total_visits
      FROM ip
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY DATE(created_at)
    )
    SELECT 
      visit_date,
      total_visits,
      LAG(total_visits) OVER (ORDER BY visit_date) as previous_day_visits
    FROM DailyCounts
    ORDER BY visit_date ASC;
  `);

  return rawData.rows.map((row: any) => {
    const prev = row.previous_day_visits;
    const current = row.total_visits;
    const increment = prev ? (((current - prev) / prev) * 100).toFixed(1) : 0;

    return {
      date: new Date(row.visit_date).toLocaleDateString(),
      visits: current,
      increment: Number(increment),
    };
  });
}

export async function getIpSegments() {
  const db = getDb();
  const rawData = await db.raw(`
    SELECT 
      SUBSTRING(ip FROM '^([0-9]+\.[0-9]+)') || '.*.*' AS ip_segment,
      COUNT("ipId") as segment_count
    FROM ip
    GROUP BY ip_segment
    ORDER BY segment_count DESC
    LIMIT 5;
  `);

  return rawData.rows;
}
