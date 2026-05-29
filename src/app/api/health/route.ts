import { NextResponse } from "next/server";
import { APP_NAME, APP_VERSION } from "@/lib/app-info";

// force-static so this route is also emitted by the static-export (Pages) build.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    status: "ok",
    name: APP_NAME,
    version: APP_VERSION,
  });
}
