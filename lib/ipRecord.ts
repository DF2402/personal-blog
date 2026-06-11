import "server-only";
import { error } from "console";
import { getDb } from "./db";

export async function addRecord(ipAddress: string) {
  try {
    const db = getDb();
    const exist = await db("ip")
      .where({ ip: ipAddress })
      .whereRaw("DATE(created_at) = CURRENT_DATE")
      .first();
    if (!exist) {
      await db("ip").insert({
        ip: ipAddress,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
