// app/api/auth/session/route.js
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    // Return session data without sensitive information
    return NextResponse.json(
      {
        authenticated: true,
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          subscription: session.user.subscription || {
            tier: "free",
            status: "active",
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in session check:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
