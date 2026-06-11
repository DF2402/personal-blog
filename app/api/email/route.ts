import { NextResponse } from "next/server";

export async function GET() {
  const email = process.env.EMAIL;

  if (!email) {
    return NextResponse.json({ error: "No EMAIL" }, { status: 500 });
  }

  return NextResponse.json({ email });
}
