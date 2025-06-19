// src/app/api/auth/logout/route.js
import { redirect } from "next/navigation";
import {
  validateRequest,
  clearSessionCookie,
  authService,
} from "@/lib/auth.server";

export async function GET(request) {
  const resHeaders = new Headers();
  const sessionData = await validateRequest(request, resHeaders);

  // If there's a valid session, delete it
  if (sessionData) {
    await authService.deleteSession(sessionData.session.id);
  }

  // Clear the session cookie
  await clearSessionCookie(resHeaders);

  // Redirect to home page
  return redirect("/", { headers: resHeaders });
}
