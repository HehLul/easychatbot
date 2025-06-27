import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import "./MonetizePage.css";

function MonetizePage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("free");

  // Mock: Check if user is already paid (this would come from auth context)
  const isExistingPaidUser = false; // Set to true to test paid user view

  const steps = ["Train", "Customize", "Monetize", "Launch"];

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "1 chatbot",
        "10 chats/day per user",
        '"Powered by DeepSheep" branding',
        "Basic customization",
        "No monetization",
      ],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$19",
      period: "per month",
      features: [
        "3 chatbots",
        "100 chats/day per user",
        "Remove branding",
        "Full customization",
        "Can monetize chatbots",
        "Basic analytics",
      ],
      popular: true,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$49",
      period: "per month",
      features: [
        "Unlimited chatbots",
        "500 chats/day per user",
        "Advanced features",
        "White-label options",
        "Advanced analytics",
        "Priority support",
      ],
      popular: false,
    },
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    // Save selected plan
    localStorage.setItem("selectedPlan", selectedPlan);
    navigate("/launch");
  };

  const handleBack = () => {
    navigate("/customize");
  };

  const handleSkipToDashboard = () => {
    navigate("/dashboard");
  };

  if (isExistingPaidUser) {
    return (
      <div className="monetize-page">
        <div className="container">
          <ProgressBar
            currentStep={3}
            totalSteps={4}
            steps={steps}
            onBack={handleBack}
            onNext={handleContinue}
            onSkipToDashboard={handleSkipToDashboard}
            nextButtonText="Continue to Launch"
          />

          <div className="monetize-content">
            <div className="section-header text-center">
              <h1>Configure Your Chatbot Pricing</h1>
              <p className="text-secondary">
                Set up how users will pay for your chatbot services
              </p>
            </div>

            <div className="monetization-config">
              <div className="config-section">
                <h3>Free Tier Settings</h3>
                <p className="text-secondary text-sm mb-4">
                  Set limits for users who use your chatbot for free
                </p>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="field-label">Messages per day</label>
                    <input
                      type="number"
                      className="field-input"
                      defaultValue="10"
                    />
                  </div>
                  <div className="form-group">
                    <label className="field-label">Features included</label>
                    <select className="field-input">
                      <option>Basic chat only</option>
                      <option>Basic + file uploads</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="config-section">
                <h3>Paid Tier Settings</h3>
                <p className="text-secondary text-sm mb-4">
                  Configure your premium offering
                </p>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="field-label">Price per month</label>
                    <input
                      type="number"
                      className="field-input"
                      placeholder="9.99"
                    />
                  </div>
                  <div className="form-group">
                    <label className="field-label">Messages per day</label>
                    <input
                      type="number"
                      className="field-input"
                      defaultValue="100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="monetize-page">
      <div className="container">
        <ProgressBar
          currentStep={3}
          totalSteps={4}
          steps={steps}
          onBack={handleBack}
          onNext={handleContinue}
          onSkipToDashboard={handleSkipToDashboard}
          nextButtonText="Continue to Launch"
        />

        <div className="monetize-content">
          <div className="section-header text-center">
            <h1>Choose Your Plan</h1>
            <p className="text-secondary">
              Select the plan that best fits your chatbot needs
            </p>
          </div>

          {/* Plan Selection */}
          <div className="plans-section">
            <div className="plans-grid">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`plan-card ${
                    selectedPlan === plan.id ? "selected" : ""
                  } ${plan.popular ? "popular" : ""}`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.popular && (
                    <div className="popular-badge">Most Popular</div>
                  )}

                  <div className="plan-header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <div className="plan-price">
                      <span className="price">{plan.price}</span>
                      <span className="period">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="plan-features">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="plan-selector">
                    <div
                      className={`radio-button ${
                        selectedPlan === plan.id ? "checked" : ""
                      }`}
                    >
                      {selectedPlan === plan.id && (
                        <div className="radio-dot" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monetization Preview */}
          <div className="monetization-preview">
            <div className="preview-header">
              <h2>🚀 Unlock Monetization Potential</h2>
              <p className="text-secondary">
                See what you could earn by upgrading to Premium or Pro
              </p>
            </div>

            <div className="preview-content">
              <div className="earning-examples">
                <div className="example-card">
                  <h4>Example Revenue</h4>
                  <p className="text-sm text-secondary mb-3">
                    Set your chatbot at $9/month with 50 daily active users
                  </p>
                  <div className="revenue-calc">
                    <span className="revenue-amount">$450</span>
                    <span className="revenue-period">/month potential</span>
                  </div>
                </div>
              </div>

              <div
                className={`monetization-controls ${
                  selectedPlan === "free" ? "disabled" : ""
                }`}
              >
                <div className="controls-overlay">
                  {selectedPlan === "free" && (
                    <div className="upgrade-prompt">
                      <p className="font-semibold">
                        Upgrade to unlock monetization
                      </p>
                      <button
                        className="btn-primary btn-sm"
                        onClick={() => handlePlanSelect("premium")}
                      >
                        Choose Premium
                      </button>
                    </div>
                  )}
                </div>

                <h4>Monetization Settings</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="field-label">Monthly Price</label>
                    <input
                      type="number"
                      className="field-input"
                      placeholder="9.99"
                      disabled={selectedPlan === "free"}
                    />
                  </div>
                  <div className="form-group">
                    <label className="field-label">Daily Message Limit</label>
                    <input
                      type="number"
                      className="field-input"
                      placeholder="100"
                      disabled={selectedPlan === "free"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonetizePage;
