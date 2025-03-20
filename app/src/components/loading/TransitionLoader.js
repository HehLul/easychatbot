"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function TransitionLoader({
  duration = 1500,
  onComplete = () => {},
  withLogo = true,
  message = "Getting things ready...",
  logoPath = "/sheep-logo.png",
  logoWidth = 80,
  logoHeight = 80,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation
    const animationTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 500); // Start exit animation 500ms before duration ends

    // Complete transition after duration
    const completionTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, duration);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(completionTimer);
    };
  }, [duration, onComplete]);

  // Prevent body scroll while visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        {withLogo && (
          <div className="animate-pulse">
            <Image
              src={logoPath}
              alt="DeepSheep Logo"
              width={logoWidth}
              height={logoHeight}
              priority
            />
          </div>
        )}

        <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{
              width: "100%",
              animation: `progress ${duration}ms linear`,
            }}
          ></div>
        </div>

        {message && (
          <p className="text-gray-600 mt-4 text-sm font-medium">{message}</p>
        )}
      </div>

      <style jsx global>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
