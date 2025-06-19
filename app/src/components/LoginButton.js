// src/components/LoginButton.js
"use client";
import { useState } from "react";
import { User } from "lucide-react";

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = "/api/auth/google/start";
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
    >
      <User className="w-4 h-4" />
      {isLoading ? "Loading..." : "Sign In with Google"}
    </button>
  );
}
