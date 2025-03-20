//Auth Container component that will manage switching between login and signup forms

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "./AuthModal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthContainer({
  isOpen,
  onClose,
  initialView = "login",
}) {
  const [currentView, setCurrentView] = useState(initialView);
  const router = useRouter();

  const handleLoginSuccess = useCallback(() => {
    onClose();
    router.refresh(); // Refresh the page to update authentication state
    // You might want to redirect here, e.g.:
    // router.push('/dashboard');
  }, [onClose, router]);

  const handleSignupSuccess = useCallback(() => {
    // Switch to login view after successful signup
    setCurrentView("login");
  }, []);

  const switchToLogin = useCallback(() => {
    setCurrentView("login");
  }, []);

  const switchToSignup = useCallback(() => {
    setCurrentView("signup");
  }, []);

  return (
    <AuthModal isOpen={isOpen} onClose={onClose}>
      {currentView === "login" ? (
        <LoginForm
          onSuccess={handleLoginSuccess}
          onSwitchToSignup={switchToSignup}
        />
      ) : (
        <SignupForm
          onSuccess={handleSignupSuccess}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </AuthModal>
  );
}
