// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Check if user exists in our database
          const { data: existingUser, error: lookupError } = await supabase
            .from("users")
            .select("*")
            .eq("email", credentials.email)
            .single();

          if (lookupError && lookupError.code !== "PGRST116") {
            console.error("Error looking up user:", lookupError);
            return null;
          }

          if (!existingUser) {
            return null; // User doesn't exist
          }

          // For this implementation, we're using Supabase Auth
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error || !data.user) {
            return null;
          }

          return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // For Google OAuth
        if (account.provider === "google") {
          try {
            // Check if user exists in Supabase
            const { data: existingUser } = await supabase
              .from("users")
              .select("*")
              .eq("email", user.email)
              .single();

            if (!existingUser) {
              // Create user in Supabase
              const { data: newUser, error } = await supabase
                .from("users")
                .insert({
                  email: user.email,
                  name: user.name,
                  auth_provider: "google",
                  auth_provider_id: user.id,
                  subscription_tier: "free",
                  subscription_status: "active",
                })
                .select()
                .single();

              if (error) console.error("Error creating user:", error);
              token.user_id = newUser?.id;
            } else {
              token.user_id = existingUser.id;
            }
          } catch (error) {
            console.error("Error in JWT callback:", error);
          }
        } else if (user.id) {
          // For credentials provider
          token.user_id = user.id;
        }

        token.email = user.email;
        token.name = user.name || user.email.split("@")[0];
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.user_id;
        session.user.email = token.email;
        session.user.name = token.name;

        try {
          // Fetch additional user data from Supabase
          const { data: userData } = await supabase
            .from("users")
            .select("subscription_tier, subscription_status")
            .eq("id", token.user_id)
            .single();

          if (userData) {
            session.user.subscription = {
              tier: userData.subscription_tier,
              status: userData.subscription_status,
            };
          }
        } catch (error) {
          console.error("Error in session callback:", error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/", // We'll handle this with our modal
    error: "/", // We'll handle errors in the modal
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
