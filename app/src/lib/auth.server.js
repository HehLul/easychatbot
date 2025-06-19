// src/lib/auth.server.js
import { generateState, generateCodeVerifier, Google } from "arctic";
import { createCookieSessionStorage } from "next";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with service role key for auth operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Initialize Google OAuth
export const googleOAuth = new Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.AUTH_REDIRECT_URI
);

// Create cookie session storage
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

// Cookies for OAuth state and verifier
export const googleOAuthStateCookie = createCookieSessionStorage({
  cookie: { ...cookieOptions, name: "google_oauth_state" },
});

export const googleOAuthCodeVerifierCookie = createCookieSessionStorage({
  cookie: { ...cookieOptions, name: "google_oauth_code_verifier" },
});

// Session cookie
export const sessionCookie = createCookieSessionStorage({
  cookie: { ...cookieOptions, name: "session_id" },
});

// Auth service functions
export const authService = {
  // Get user by Google ID
  async getUserByGoogleId(googleId) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("google_id", googleId)
      .single();

    if (error) return null;
    return data;
  },

  // Create a new user
  async createUser(userData) {
    const { data, error } = await supabase
      .from("users")
      .insert({
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        google_id: userData.google_id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Create a session for user
  async createSessionForUser(userId) {
    // Generate a random session ID
    const sessionId = crypto.randomUUID();

    // Set expiration to 30 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Create session in database
    const { error } = await supabase.from("sessions").insert({
      id: sessionId,
      user_id: userId,
      expires_at: expiresAt.toISOString(),
    });

    if (error) throw error;

    return {
      id: sessionId,
      expiresAt,
    };
  },

  // Validate a session
  async validateSession(sessionId) {
    const { data: session, error } = await supabase
      .from("sessions")
      .select("id, expires_at, users(*)")
      .eq("id", sessionId)
      .single();

    if (error || !session) return null;

    // Check if session is expired
    if (new Date(session.expires_at) < new Date()) {
      await this.deleteSession(sessionId);
      return null;
    }

    // Check if session needs renewal (less than 7 days left)
    const isNearingExpiry =
      new Date(session.expires_at) <
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    if (isNearingExpiry) {
      // Renew session
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      await supabase
        .from("sessions")
        .update({ expires_at: expiresAt.toISOString() })
        .eq("id", sessionId);

      return {
        session: { id: sessionId, expiresAt },
        user: session.users,
        renewed: true,
      };
    }

    return {
      session: { id: sessionId, expiresAt: new Date(session.expires_at) },
      user: session.users,
      renewed: false,
    };
  },

  // Delete a session
  async deleteSession(sessionId) {
    await supabase.from("sessions").delete().eq("id", sessionId);
  },
};

// Helper functions for cookie management
export async function getSessionIdFromRequest(request, resHeaders) {
  const cookie = request.headers.get("cookie");
  const sessionId = await sessionCookie.parse(cookie);
  return sessionId;
}

export async function setSessionCookie(headers, session) {
  const sessionCookieValue = await sessionCookie.serialize(session.id);
  headers.append("Set-Cookie", sessionCookieValue);
}

export async function clearSessionCookie(headers) {
  const emptyCookie = await sessionCookie.serialize("", { maxAge: 0 });
  headers.append("Set-Cookie", emptyCookie);
}

// Request validation function
export async function validateRequest(request, resHeaders = new Headers()) {
  const sessionId = await getSessionIdFromRequest(request, resHeaders);

  if (!sessionId) {
    return null;
  }

  const sessionData = await authService.validateSession(sessionId);

  if (!sessionData) {
    await clearSessionCookie(resHeaders);
    return null;
  }

  if (sessionData.renewed) {
    await setSessionCookie(resHeaders, sessionData.session);
  }

  return sessionData;
}
