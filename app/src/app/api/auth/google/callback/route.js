// src/app/api/auth/google/callback/route.js
import { redirect } from "next/navigation";
import { decodeIdToken } from "arctic";
import { z } from "zod";
import {
  googleOAuth,
  googleOAuthStateCookie,
  googleOAuthCodeVerifierCookie,
  authService,
  setSessionCookie,
  validateRequest,
} from "@/lib/auth.server";

const googleClaimsSchema = z.object({
  sub: z.string(), // Google user ID
  email: z.string().email(),
  given_name: z.string(),
  family_name: z.string(),
});

export async function GET(request) {
  const resHeaders = new Headers();

  // Check if user is already logged in
  const validationResult = await validateRequest(request, resHeaders);

  if (validationResult !== null) {
    return redirect("/dashboard", { headers: resHeaders });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieHeader = request.headers.get("cookie");

  const storedState = await googleOAuthStateCookie.parse(cookieHeader);
  const codeVerifier = await googleOAuthCodeVerifierCookie.parse(cookieHeader);

  // Verify OAuth parameters
  if (!code || !state || !storedState || !codeVerifier) {
    return new Response("Invalid OAuth callback", { status: 400 });
  }

  // Verify state matches
  if (state !== storedState) {
    return new Response("State mismatch", { status: 400 });
  }

  try {
    // Exchange code for tokens
    const tokens = await googleOAuth.validateAuthorizationCode(
      code,
      codeVerifier
    );

    // Decode ID token to get user info
    const rawClaims = decodeIdToken(tokens.idToken);
    const parseClaimsResult = googleClaimsSchema.safeParse(rawClaims);

    if (!parseClaimsResult.success) {
      return new Response("Invalid user data", { status: 400 });
    }

    const claims = parseClaimsResult.data;

    // Check if user exists
    let user = await authService.getUserByGoogleId(claims.sub);

    // If not, create new user
    if (!user) {
      user = await authService.createUser({
        email: claims.email,
        first_name: claims.given_name,
        last_name: claims.family_name,
        google_id: claims.sub,
      });
    }

    // Create session
    const newSession = await authService.createSessionForUser(user.id);
    await setSessionCookie(resHeaders, newSession);

    // Redirect to dashboard
    return redirect("/dashboard", { headers: resHeaders });
  } catch (error) {
    console.error("Authentication error:", error);
    return new Response("Authentication failed", { status: 400 });
  }
}
