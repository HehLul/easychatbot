"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Mail,
  Link as LinkIcon,
  AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FeedbackButton } from "@/components/FeedbackButton";
import { AuthModal } from "@/components/auth";
import { SignupForm } from "@/components/auth";

export default function LaunchPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [chatbotConfig, setChatbotConfig] = useState(null);
  const [customization, setCustomization] = useState(null);
  const [error, setError] = useState(null);

  // State for controlling the signup modal
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem("chatbotConfig");
      const savedCustomization = localStorage.getItem("customization");

      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        setChatbotConfig(config);
        setSubdomain(config.name.toLowerCase().replace(/[^a-z0-9]/g, ""));
      }

      if (savedCustomization) {
        setCustomization(JSON.parse(savedCustomization));
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const payload = {
        email,
        subdomain,
        chatbotConfig: JSON.parse(localStorage.getItem("chatbotConfig")),
        customization: JSON.parse(localStorage.getItem("customization")),
      };

      const response = await fetch("/api/launch-chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (
          response.status === 403 &&
          data.error === "Maximum chatbot limit reached"
        ) {
          throw new Error(
            data.message ||
              "Maximum limit of chatbots reached. Please try again later."
          );
        }
        throw new Error(data.error || "Failed to launch chatbot");
      }

      // Store additional info if needed
      localStorage.setItem("userEmail", email);
      localStorage.setItem("chatbotUrl", data.url);

      // Set email sent state
      setEmailSent(true);

      // Show signup modal after successful submission
      setIsSignupModalOpen(true);
    } catch (error) {
      console.error("Launch error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // For testing - this skips the email submission
  const handleTestSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  // Handle signup success
  const handleSignupSuccess = () => {
    // Optionally redirect to dashboard or show success message
    setIsSignupModalOpen(false);
    // router.push('/dashboard');
  };

  // Close modal
  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="/sheep-logo.png"
                alt="DeepSheep Logo"
                className="w-8 h-8 text-blue-500"
              />
              <span className="text-lg font-medium">DeepSheep</span>
            </Link>

            <FeedbackButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator (keep your existing progress code) */}
          <div className="flex items-center justify-between mb-12">
            {/* ... your existing progress indicator code ... */}
          </div>

          {/* Launch Content */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800">
                    Unable to Launch Chatbot
                  </h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                  {error.includes("Maximum limit") && (
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        We're experiencing high demand for our beta. Please:
                      </p>
                      <ul className="list-disc ml-5 mt-1">
                        <li>Try again later when spots open up</li>
                        <li>Contact support for enterprise access</li>
                        <li>Join our waitlist for priority access</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {emailSent ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Check Your Email!
                </h2>
                <p className="text-gray-600">
                  We've sent your chatbot access link to {email}. Click the link
                  in your email to access your chatbot.
                </p>

                {/* Sign up prompt */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-md font-medium text-blue-900">
                    Create an account to manage your chatbot
                  </h3>
                  <p className="text-sm text-blue-800 mb-4">
                    Sign up to access your dashboard and manage all your
                    chatbots in one place.
                  </p>
                  <button
                    onClick={handleTestSignupModal}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Ready to Launch Your AI Chatbot
                  </h1>
                  <p className="text-gray-600">
                    Your chatbot is ready to go live. Enter your email and we'll
                    send you the access link.
                  </p>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-900" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Launch Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Me App URL
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Additional Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex gap-3">
                    <LinkIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <strong className="font-medium">
                        What happens next?
                      </strong>
                      <ul className="mt-1 ml-4 list-disc text-blue-800">
                        <li>Check your email for your chatbot access link</li>
                        <li>Click the link to access your chatbot</li>
                        <li>Share your chatbot with your audience</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* For testing: Button to directly show signup modal */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleTestSignupModal}
          className="py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Test Signup Modal
        </button>
      </div>

      {/* Signup Modal */}
      <AuthModal isOpen={isSignupModalOpen} onClose={closeSignupModal}>
        <SignupForm
          onSuccess={handleSignupSuccess}
          onSwitchToLogin={() => {}}
        />
      </AuthModal>
    </div>
  );
}
