import { NextResponse } from "next/server";
import getGithubData from "@/lib/fetchGithubApi";
export async function GET(request: Request) {
  try {
    const data = await getGithubData();
    console.log(data);
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
