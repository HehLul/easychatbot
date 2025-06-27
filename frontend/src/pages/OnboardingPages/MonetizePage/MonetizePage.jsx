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
      features: ["1 chatbot"],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$19",
      period: "per month",
      features: ["3 chatbots"],
      popular: true,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$49",
      period: "per month",
      features: ["Unlimited chatbots"],
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
            <h3>Choose Your Plan</h3>
            <p className="text-secondary">
              Select the plan that best fits your chatbot needs
            </p>
          </div>

          {/* Plan Selection */}
          {/* <div className="plans-section">
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
          </div> */}

          {/* Monetization Preview */}
          <div className="monetization-preview">
            <div className="preview-header">
              <h2>🚀 Monetize Your Chatbot</h2>
              <p className="text-secondary">
                Create multiple pricing tiers and turn your AI chatbot into a
                revenue-generating business
              </p>

              {/* Revenue Potential Banner */}
              <div className="revenue-banner">
                <div className="revenue-stat">
                  <span className="stat-number">$2,500</span>
                  <span className="stat-label">Average monthly revenue</span>
                </div>
                <div className="revenue-stat">
                  <span className="stat-number">73%</span>
                  <span className="stat-label">Users upgrade to paid</span>
                </div>
                <div className="revenue-stat">
                  <span className="stat-number">30 days</span>
                  <span className="stat-label">Average payback period</span>
                </div>
              </div>
            </div>

            <div className="preview-content">
              <div
                className={`monetization-controls ${
                  selectedPlan === "free" ? "disabled" : ""
                }`}
              >
                <div className="controls-overlay">
                  {selectedPlan === "free" && (
                    <div className="upgrade-prompt">
                      <div className="upgrade-icon">💰</div>
                      <h3>Start Making Money Today</h3>
                      <p className="upgrade-description">
                        Set up custom pricing plans, control usage limits, and
                        start earning from your chatbot immediately
                      </p>
                      <div className="upgrade-benefits">
                        <div className="benefit-item">
                          ✓ Unlimited pricing tiers
                        </div>
                        <div className="benefit-item">
                          ✓ Monthly & annual billing
                        </div>
                        <div className="benefit-item">
                          ✓ Token-based usage control
                        </div>
                        <div className="benefit-item">
                          ✓ Real-time revenue tracking
                        </div>
                      </div>
                      <button
                        className="btn-primary btn-lg upgrade-btn"
                        onClick={() => handlePlanSelect("premium")}
                      >
                        Upgrade to Premium - Start Monetizing
                      </button>
                      <p className="upgrade-note">
                        30-day money-back guarantee
                      </p>
                    </div>
                  )}
                </div>

                {/* Pricing Plans Configuration */}
                <div className="pricing-plans-config">
                  <h3>Configure Your Pricing Plans</h3>
                  <p className="text-secondary text-sm mb-6">
                    Create up to 3 pricing tiers for your chatbot users
                  </p>

                  {/* Free Plan */}
                  <div className="plan-config-card">
                    <div className="plan-config-header">
                      <h4>Free Plan</h4>
                      <span className="plan-badge free">Always Available</span>
                    </div>
                    <div className="config-grid">
                      <div className="config-group">
                        <label className="config-label">Tokens per month</label>
                        <input
                          type="number"
                          className="config-input"
                          defaultValue="1000"
                          disabled={selectedPlan === "free"}
                        />
                        <span className="config-help">≈ 50 messages</span>
                      </div>
                      <div className="config-group">
                        <label className="config-label">
                          Features included
                        </label>
                        <div className="feature-toggles">
                          <label className="toggle-item">
                            <input
                              type="checkbox"
                              defaultChecked
                              disabled={selectedPlan === "free"}
                            />
                            <span>Basic chat</span>
                          </label>
                          <label className="toggle-item">
                            <input
                              type="checkbox"
                              disabled={selectedPlan === "free"}
                            />
                            <span>File uploads</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Premium Plan */}
                  <div className="plan-config-card">
                    <div className="plan-config-header">
                      <h4>Premium Plan</h4>
                      <span className="plan-badge premium">Most Popular</span>
                    </div>
                    <div className="config-grid">
                      <div className="config-row">
                        <div className="config-group">
                          <label className="config-label">Monthly price</label>
                          <div className="price-input">
                            <span className="currency">$</span>
                            <input
                              type="number"
                              className="config-input"
                              placeholder="19.99"
                              disabled={selectedPlan === "free"}
                            />
                          </div>
                        </div>
                        <div className="config-group">
                          <label className="config-label">
                            Annual price (optional)
                          </label>
                          <div className="price-input">
                            <span className="currency">$</span>
                            <input
                              type="number"
                              className="config-input"
                              placeholder="199.99"
                              disabled={selectedPlan === "free"}
                            />
                            <span className="config-help">17% discount</span>
                          </div>
                        </div>
                      </div>
                      <div className="config-row">
                        <div className="config-group">
                          <label className="config-label">
                            Tokens per month
                          </label>
                          <input
                            type="number"
                            className="config-input"
                            defaultValue="10000"
                            disabled={selectedPlan === "free"}
                          />
                          <span className="config-help">≈ 500 messages</span>
                        </div>
                        <div className="config-group">
                          <label className="config-label">
                            Priority support
                          </label>
                          <select
                            className="config-input"
                            disabled={selectedPlan === "free"}
                          >
                            <option>24h response time</option>
                            <option>12h response time</option>
                            <option>4h response time</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pro Plan */}
                  <div className="plan-config-card">
                    <div className="plan-config-header">
                      <h4>Pro Plan</h4>
                      <span className="plan-badge pro">Enterprise</span>
                    </div>
                    <div className="config-grid">
                      <div className="config-row">
                        <div className="config-group">
                          <label className="config-label">Monthly price</label>
                          <div className="price-input">
                            <span className="currency">$</span>
                            <input
                              type="number"
                              className="config-input"
                              placeholder="49.99"
                              disabled={selectedPlan === "free"}
                            />
                          </div>
                        </div>
                        <div className="config-group">
                          <label className="config-label">
                            Annual price (optional)
                          </label>
                          <div className="price-input">
                            <span className="currency">$</span>
                            <input
                              type="number"
                              className="config-input"
                              placeholder="499.99"
                              disabled={selectedPlan === "free"}
                            />
                            <span className="config-help">17% discount</span>
                          </div>
                        </div>
                      </div>
                      <div className="config-row">
                        <div className="config-group">
                          <label className="config-label">
                            Tokens per month
                          </label>
                          <input
                            type="number"
                            className="config-input"
                            defaultValue="50000"
                            disabled={selectedPlan === "free"}
                          />
                          <span className="config-help">≈ 2,500 messages</span>
                        </div>
                        <div className="config-group">
                          <label className="config-label">
                            Advanced features
                          </label>
                          <div className="feature-toggles">
                            <label className="toggle-item">
                              <input
                                type="checkbox"
                                defaultChecked
                                disabled={selectedPlan === "free"}
                              />
                              <span>API access</span>
                            </label>
                            <label className="toggle-item">
                              <input
                                type="checkbox"
                                defaultChecked
                                disabled={selectedPlan === "free"}
                              />
                              <span>White-label</span>
                            </label>
                            <label className="toggle-item">
                              <input
                                type="checkbox"
                                disabled={selectedPlan === "free"}
                              />
                              <span>Custom integrations</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Projection */}
                  <div className="revenue-projection">
                    <h4>Revenue Projection</h4>
                    <p className="text-secondary text-sm mb-4">
                      Based on your pricing and industry averages
                    </p>
                    <div className="projection-grid">
                      <div className="projection-item">
                        <span className="projection-label">
                          Expected monthly users
                        </span>
                        <input
                          type="number"
                          className="projection-input"
                          defaultValue="100"
                          disabled={selectedPlan === "free"}
                        />
                      </div>
                      <div className="projection-item">
                        <span className="projection-label">
                          Conversion rate
                        </span>
                        <span className="projection-value">
                          15% (industry avg)
                        </span>
                      </div>
                      <div className="projection-item">
                        <span className="projection-label">
                          Estimated monthly revenue
                        </span>
                        <span className="projection-value revenue-highlight">
                          $450 - $890
                        </span>
                      </div>
                    </div>
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
