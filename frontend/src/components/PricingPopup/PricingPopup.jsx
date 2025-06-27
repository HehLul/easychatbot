import React, { useState } from "react";
import "./PricingPopup.css";

function PricingPopup({ isOpen, onClose, onSelectPlan }) {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "1 chatbot",
        "10 chats/day per user",
        "Basic customization",
        "Community support",
        '"Powered by DeepSheep" branding',
        "No monetization",
      ],
      popular: false,
      buttonText: "Get Started Free",
      buttonStyle: "secondary",
    },
    {
      id: "premium",
      name: "Premium",
      description: "Best for growing businesses",
      monthlyPrice: 19,
      yearlyPrice: 109,
      features: [
        "3 chatbots",
        "100 chats/day per user",
        "Full customization",
        "Remove branding",
        "Can monetize chatbots",
        "Email support",
        "Basic analytics",
      ],
      popular: true,
      buttonText: "Start Premium",
      buttonStyle: "primary",
    },
    {
      id: "pro",
      name: "Pro",
      description: "For serious AI entrepreneurs",
      monthlyPrice: 37,
      yearlyPrice: 299, // ~17% discount
      features: [
        "Unlimited chatbots",
        "500 chats/day per user",
        "Advanced features",
        "White-label options",
        "Priority support",
        "Advanced analytics",
        "API access",
      ],
      popular: false,
      buttonText: "Go Pro",
      buttonStyle: "primary",
    },
  ];

  const handlePlanSelect = (plan) => {
    if (plan.id === "free") {
      onSelectPlan(plan);
      onClose();
    } else {
      // Route to Stripe - this would be your actual Stripe integration
      console.log(`Redirecting to Stripe for ${plan.name} - ${billingCycle}`);
      // Example: window.location.href = `/stripe-checkout?plan=${plan.id}&billing=${billingCycle}`;
      onSelectPlan(plan);
    }
  };

  const calculateSavings = (monthly, yearly) => {
    if (monthly === 0) return 0;
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - yearly;
    return Math.round((savings / monthlyCost) * 100);
  };

  if (!isOpen) return null;

  return (
    <div className="pricing-popup-overlay" onClick={onClose}>
      <div className="pricing-popup" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="popup-header">
          <div className="header-content">
            <h2>Choose Your Plan</h2>
            <p className="header-subtitle">
              Start building your AI business today
            </p>
          </div>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Billing Toggle */}
        <div className="billing-toggle">
          <div className="toggle-container">
            <button
              className={`toggle-option ${
                billingCycle === "monthly" ? "active" : ""
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`toggle-option ${
                billingCycle === "yearly" ? "active" : ""
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Annual
              <span className="savings-badge">Save up to 17%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="plans-grid">
          {plans.map((plan) => {
            const currentPrice =
              billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const savings = calculateSavings(
              plan.monthlyPrice,
              plan.yearlyPrice
            );

            return (
              <div
                key={plan.id}
                className={`plan-card ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}

                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>

                  <div className="plan-pricing">
                    <div className="price-container">
                      <span className="currency">$</span>
                      <span className="price">{currentPrice}</span>
                      <span className="period">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>

                    {billingCycle === "yearly" && plan.monthlyPrice > 0 && (
                      <div className="price-details">
                        <span className="monthly-equivalent">
                          ${Math.round(plan.yearlyPrice / 12)}/month billed
                          annually
                        </span>
                        {savings > 0 && (
                          <span className="savings-text">
                            Save {savings}% vs monthly
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="plan-features">
                  <ul className="features-list">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-check">✓</span>
                        <span className="feature-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="plan-footer">
                  <button
                    className={`plan-button ${plan.buttonStyle}`}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="popup-footer">
          {/* <p className="footer-text">
            All plans include 30-day money-back guarantee • No setup fees •
            Cancel anytime
          </p> */}
          <p className="footer-text">No setup fees • Cancel anytime</p>
        </div>
      </div>
    </div>
  );
}

export default PricingPopup;
