// src/app/dashboard/page.js
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth.server";
import { Divide, Heading1 } from "lucide-react";

export async function GET(request) {
  const resHeaders = new Headers();
  const sessionData = await validateRequest(request, resHeaders);

  if (!sessionData) {
    return redirect("/login", { headers: resHeaders });
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
