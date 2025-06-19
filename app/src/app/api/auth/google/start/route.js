// src/app/api/auth/google/start/route.js
import { generateState, generateCodeVerifier } from "arctic";
import { redirect } from "next/navigation";
import {
  googleOAuth,
  googleOAuthStateCookie,
  googleOAuthCodeVerifierCookie,
  validateRequest,
} from "@/lib/auth.server";

export async function GET(request) {
  const resHeaders = new Headers();

  // Check if user is already logged in
  const validationResult = await validateRequest(request, resHeaders);

  // If they are, redirect them to the app
  if (validationResult !== null) {
    return redirect("/dashboard", { headers: resHeaders });
  }

  // Generate state and code verifier for OAuth
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  // Generate authorization URL
  const authorizationURL = googleOAuth.createAuthorizationURL(
    state,
    codeVerifier,
    ["profile", "email"]
  );

  // Set cookies for state and code verifier
  const stateCookieString = await googleOAuthStateCookie.serialize(state);
  const codeVerifierCookieString =
    await googleOAuthCodeVerifierCookie.serialize(codeVerifier);

  resHeaders.append("Set-Cookie", stateCookieString);
  resHeaders.append("Set-Cookie", codeVerifierCookieString);

  // Redirect to Google authorization page
  return redirect(authorizationURL.toString(), { headers: resHeaders });
}
