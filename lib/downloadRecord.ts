import "server-only";
import { error } from "console";
import { getDb } from "./db";

export async function addDownloadRecord(ipAddress: string) {
  try {
    const db = getDb();
    const exist = await db("download")
      .where({ ip: ipAddress })
      .whereRaw("DATE(created_at) = CURRENT_DATE")
      .first();
    if (!exist) {
      await db("download").insert({
        ip: ipAddress,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
