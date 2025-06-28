import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import PricingPopup from "../../../components/PricingPopup/PricingPopup";
import "./LaunchPage.css";

function LaunchPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    botName: "my-chatbot",
    customDomain: "",
    email: "",
    subscribeNewsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);

  // Mock: Check if user is paid (this would come from auth context)
  const isPaidUser = false;

  const steps = ["Train", "Customize", "Monetize", "Launch"];

  const loadingMessages = [
    "Deploying your AI chatbot...",
    "Setting up your domain...",
    "Configuring chat features...",
    "Almost ready...",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [showPricing, setShowPricing] = useState(false);
  const handleUpgradePlan = () => {
    setShowPricing(true);
  };

  const generateBotUrl = () => {
    return `https://${formData.botName}.deepsheep.ai`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateBotUrl());
    // You could add a toast notification here
    console.log("URL copied to clipboard!");
  };

  const handleLaunch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingStage(0);

    // Simulate loading stages
    for (let i = 0; i < loadingMessages.length; i++) {
      setLoadingStage(i);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // Save launch data
    localStorage.setItem("launchData", JSON.stringify(formData));

    // Navigate to dashboard
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate("/monetize");
  };

  const handleSkipToDashboard = () => {
    navigate("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="launch-page">
        <div className="launch-page-container">
          <div className="launch-page-loading-screen">
            <div className="launch-page-loading-content">
              <div className="launch-page-loading-icon">
                <div className="launch-page-bot-animation">🤖</div>
              </div>
              <h2 className="launch-page-loading-title">
                Launching Your Chatbot
              </h2>
              <p className="launch-page-loading-message">
                {loadingMessages[loadingStage]}
              </p>
              <div className="launch-page-loading-bar">
                <div
                  className="launch-page-loading-fill"
                  style={{
                    width: `${
                      ((loadingStage + 1) / loadingMessages.length) * 100
                    }%`,
                  }}
                />
              </div>
              <div className="launch-page-loading-dots">
                <div className="launch-page-dot"></div>
                <div className="launch-page-dot"></div>
                <div className="launch-page-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="launch-page">
      <PricingPopup
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        onSelectPlan={handleUpgradePlan}
      />
      <div className="launch-page-container container">
        <ProgressBar
          currentStep={4}
          totalSteps={4}
          steps={steps}
          onBack={handleBack}
          onSkipToDashboard={handleSkipToDashboard}
          showSkip={false}
        />

        <div className="launch-page-content">
          {/* Hero Section */}
          <div className="launch-page-hero">
            <div className="launch-page-celebration">
              <h1 className="launch-page-title">
                🎉 Your AI Chatbot is Ready to Launch!
              </h1>
              <p className="launch-page-subtitle">
                Configure your final settings and share your chatbot with the
                world
              </p>
            </div>

            <div className="launch-page-progress-complete">
              <div className="launch-page-progress-bar">
                <div className="launch-page-progress-fill"></div>
              </div>
              <span className="launch-page-progress-text">100% Complete</span>
            </div>
          </div>

          <form onSubmit={handleLaunch} className="launch-page-form">
            {/* Domain Setup Section */}
            <div className="launch-page-section">
              <div className="launch-page-section-header">
                <h3>🌐 Your Chatbot URL</h3>
                <p className="launch-page-section-description">
                  Customize your chatbot's web address
                </p>
              </div>

              <div className="launch-page-url-section">
                <div className="launch-page-url-preview">
                  <div className="launch-page-url-display">
                    <span className="launch-page-url-protocol">https://</span>
                    <input
                      type="text"
                      className="launch-page-url-input"
                      value={formData.botName}
                      onChange={(e) =>
                        handleInputChange(
                          "botName",
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, "")
                        )
                      }
                      placeholder="my-chatbot"
                    />
                    <span className="launch-page-url-domain">
                      .deepsheep.ai
                    </span>
                  </div>
                  <button
                    type="button"
                    className="launch-page-copy-btn"
                    onClick={copyToClipboard}
                  >
                    📋 Copy
                  </button>
                </div>

                <div className="launch-page-url-help">
                  <p className="launch-page-help-text">
                    This will be your chatbot's public URL that you can share
                    with anyone
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Domain Section (Premium/Pro only) */}
            <div className="launch-page-section">
              <div className="launch-page-section-header">
                <h3>🏷️ Custom Domain</h3>
                <p className="launch-page-section-description">
                  Use your own domain name for a professional look
                </p>
              </div>

              <div className="launch-page-custom-domain">
                {!isPaidUser ? (
                  <div className="launch-page-upgrade-prompt">
                    <div className="launch-page-upgrade-content">
                      <div className="launch-page-upgrade-icon">👑</div>
                      <h4>Premium Feature</h4>
                      <p>
                        Upgrade to use your own custom domain like
                        chatbot.yourbusiness.com
                      </p>
                      <button
                        onClick={handleUpgradePlan}
                        type="button"
                        className="launch-page-upgrade-btn"
                      >
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="launch-page-domain-config">
                    <div className="launch-page-custom-input">
                      <input
                        type="text"
                        className="launch-page-domain-input"
                        placeholder="chatbot.yourbusiness.com"
                        value={formData.customDomain}
                        onChange={(e) =>
                          handleInputChange("customDomain", e.target.value)
                        }
                      />
                    </div>

                    <details className="launch-page-dns-help">
                      <summary className="launch-page-dns-summary">
                        Need help setting up DNS? Click here
                      </summary>
                      <div className="launch-page-dns-content">
                        <p>
                          Add this CNAME record to your domain's DNS settings:
                        </p>
                        <code className="launch-page-dns-code">
                          CNAME: chatbot → your-bot-name.deepsheep.ai
                        </code>
                        <div className="launch-page-dns-steps">
                          <h5>Steps to configure:</h5>
                          <ol>
                            <li>
                              Log into your domain registrar (GoDaddy,
                              Namecheap, etc.)
                            </li>
                            <li>Go to DNS settings or DNS management</li>
                            <li>Add a new CNAME record</li>
                            <li>
                              Set the name/host to your subdomain (e.g.,
                              "chatbot")
                            </li>
                            <li>
                              Set the value/target to:
                              your-bot-name.deepsheep.ai
                            </li>
                            <li>
                              Save changes (may take up to 24 hours to
                              propagate)
                            </li>
                          </ol>
                        </div>
                      </div>
                    </details>
                  </div>
                )}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="launch-page-section">
              <div className="launch-page-section-header">
                <h3>📧 Stay in the Loop</h3>
                <p className="launch-page-section-description">
                  Get updates, new features, and exclusive discounts (optional)
                </p>
              </div>

              <div className="launch-page-newsletter">
                <div className="launch-page-email-input">
                  <input
                    type="email"
                    className="launch-page-newsletter-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <label className="launch-page-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.subscribeNewsletter}
                    onChange={(e) =>
                      handleInputChange("subscribeNewsletter", e.target.checked)
                    }
                  />
                  <span className="launch-page-checkbox-text">
                    Yes, send me updates and tips for growing my AI business
                  </span>
                </label>

                <p className="launch-page-privacy-note">
                  We'll never spam you. Unsubscribe anytime with one click.
                </p>
              </div>
            </div>

            {/* Launch Button */}
            <div className="launch-page-cta">
              <button type="submit" className="launch-page-launch-btn">
                <span className="launch-page-btn-icon">🚀</span>
                Launch Your Chatbot
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LaunchPage;
