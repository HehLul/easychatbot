"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function LoadingOverlay({
  isVisible,
  duration = null,
  onComplete = () => {},
  message = "Loading...",
  blur = true,
  showSpinner = true,
  theme = "light", // 'light' or 'dark'
}) {
  const [isShowing, setIsShowing] = useState(isVisible);

  // Handle automatic hiding after duration
  useEffect(() => {
    setIsShowing(isVisible);

    let timer;
    if (isVisible && duration) {
      timer = setTimeout(() => {
        setIsShowing(false);
        onComplete();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, duration, onComplete]);

  // Handle body scroll locking
  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isShowing]);

  // Don't render anything if not showing
  if (!isShowing) return null;

  // Determine styles based on theme
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  const spinnerColor =
    theme === "dark"
      ? "border-white border-t-transparent"
      : "border-blue-500 border-t-transparent";

  // Use portal to render at the end of document body
  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
        blur ? "backdrop-blur-sm" : ""
      }`}
    >
      {/* Overlay background */}
      <div
        className={`absolute inset-0 ${
          theme === "dark" ? "bg-black/70" : "bg-white/70"
        }`}
      ></div>

      {/* Loading content */}
      <div
        className={`relative z-10 ${bgColor} p-8 rounded-xl shadow-xl flex flex-col items-center`}
      >
        {showSpinner && (
          <div className="mb-4">
            <div
              className={`w-12 h-12 rounded-full animate-spin border-4 ${spinnerColor}`}
            ></div>
          </div>
        )}

        {message && (
          <p className={`text-lg font-medium ${textColor}`}>{message}</p>
        )}
      </div>
    </div>,
    document.body
  );
}
