// src/app/api/auth/me/route.js
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth.server";

export async function GET(request) {
  const resHeaders = new Headers();
  const sessionData = await validateRequest(request, resHeaders);

  if (!sessionData) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Return user data (exclude sensitive info)
  return NextResponse.json(
    {
      id: sessionData.user.id,
      email: sessionData.user.email,
      first_name: sessionData.user.first_name,
      last_name: sessionData.user.last_name,
    },
    { headers: resHeaders }
  );
}
