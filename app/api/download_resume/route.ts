import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { trackDownload } from "../../actions";
export async function GET(request: Request) {
  if (!process.env.RESUMESOURCE) {
    return NextResponse.json({ error: "No RESUMESOURCE" }, { status: 500 });
  }
  const resumeSource = path.join(process.cwd(), process.env.RESUMESOURCE);

  try {
    const fileBuffer = await readFile(resumeSource);

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set("Content-Disposition", `inline; filename="Resume_Danny"`);

    await trackDownload();
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error(error);
  }
}
