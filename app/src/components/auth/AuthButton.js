"use client";

import { useState } from "react";
import AuthContainer from "./AuthContainer";

export default function AuthButton({
  type = "login",
  buttonText,
  className = "",
}) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Default button texts if not provided
  const defaultButtonText = type === "login" ? "Login" : "Sign Up";
  const displayText = buttonText || defaultButtonText;

  // Default button styles
  const defaultClassName =
    "py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium " +
    (type === "login"
      ? "text-blue-600 bg-white hover:bg-gray-50 border-blue-600"
      : "text-white bg-blue-600 hover:bg-blue-700");

  return (
    <>
      <button onClick={openAuthModal} className={className || defaultClassName}>
        {displayText}
      </button>

      <AuthContainer
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialView={type}
      />
    </>
  );
}
