import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import "./MonetizePage.css";

function MonetizePage() {
  const navigate = useNavigate();
  const [isPaidUser, setIsPaidUser] = useState(false); // Start as false for new users

  const steps = ["Train", "Customize", "Monetize", "Launch"];

  const handleUpgrade = () => {
    // Simulate upgrade process
    setIsPaidUser(true);
  };

  const handleContinue = () => {
    navigate("/launch");
  };

  const handleBack = () => {
    navigate("/customize");
  };

  const handleSkipToDashboard = () => {
    navigate("/dashboard");
  };

  if (isPaidUser) {
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
              <h1>🎉 Welcome to Premium!</h1>
              <p className="text-secondary">
                Set up your monetization strategy and start earning
              </p>
            </div>

            <div className="paid-user-placeholder">
              <div className="placeholder-card">
                <h3>Premium Monetization Tools</h3>
                <p className="text-secondary">
                  This is where the bank details setup and pricing plan builder
                  will go.
                </p>
                <ul className="feature-list">
                  <li>💳 Stripe integration for payments</li>
                  <li>📊 Create custom pricing plans</li>
                  <li>⚙️ Configure features and token limits</li>
                  <li>💰 Set monthly and annual pricing</li>
                </ul>
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
          nextButtonText="Skip to Launch"
        />

        <div className="monetize-content">
          {/* Educational Hero Section */}
          <div className="educational-hero">
            <div className="hero-content">
              <div className="problem-statement">
                <h1>Your Chatbot Has Visitors, But No Revenue</h1>
                <p className="problem-text">
                  Right now, people can visit your chatbot, ask questions, get
                  answers, and leave. You're providing value but missing out on
                  turning those interactions into income.
                </p>
                <a href="/launch">Skip</a>
              </div>

              {/* Before/After Comparison */}
              {/* <div className="comparison-visual">
                <div className="comparison-card before">
                  <div className="card-header">
                    <span className="status-indicator free">Free Chatbot</span>
                  </div>
                  <div className="card-content">
                    <div className="visitor-flow">
                      <div className="flow-step">
                        <span className="step-icon">👥</span>
                        <span className="step-text">100 visitors</span>
                      </div>
                      <div className="flow-arrow">→</div>
                      <div className="flow-step">
                        <span className="step-icon">💬</span>
                        <span className="step-text">Ask questions</span>
                      </div>
                      <div className="flow-arrow">→</div>
                      <div className="flow-step">
                        <span className="step-icon">🚪</span>
                        <span className="step-text">Leave</span>
                      </div>
                    </div>
                    <div className="revenue-result">
                      <span className="revenue-amount zero">$0</span>
                      <span className="revenue-label">Monthly Revenue</span>
                    </div>
                  </div>
                </div>

                <div className="vs-divider">
                  <span>VS</span>
                </div>

                <div className="comparison-card after">
                  <div className="card-header">
                    <span className="status-indicator paid">
                      Monetized Chatbot
                    </span>
                  </div>
                  <div className="card-content">
                    <div className="visitor-flow">
                      <div className="flow-step">
                        <span className="step-icon">👥</span>
                        <span className="step-text">100 visitors</span>
                      </div>
                      <div className="flow-arrow">→</div>
                      <div className="flow-step">
                        <span className="step-icon">💰</span>
                        <span className="step-text">15% upgrade</span>
                      </div>
                      <div className="flow-arrow">→</div>
                      <div className="flow-step">
                        <span className="step-icon">🔄</span>
                        <span className="step-text">Recurring revenue</span>
                      </div>
                    </div>
                    <div className="revenue-result">
                      <span className="revenue-amount positive">$450+</span>
                      <span className="revenue-label">Monthly Revenue</span>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Benefits */}
              {/* <div className="benefits-section">
                <h2>Transform Your Chatbot Into a Business</h2>
                <div className="benefits-grid">
                  <div className="benefit-card">
                    <div className="benefit-icon">💸</div>
                    <h3>Turn Conversations Into Revenue</h3>
                    <p>
                      Every chat becomes a potential customer instead of just a
                      cost
                    </p>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-icon">🔄</div>
                    <h3>Build Recurring Income</h3>
                    <p>
                      Create subscription plans that generate predictable
                      monthly revenue
                    </p>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-icon">📈</div>
                    <h3>Scale Your AI Business</h3>
                    <p>Grow from a free tool to a profitable SaaS business</p>
                  </div>
                </div>
              </div> */}

              {/* Upgrade CTA */}
              <div className="upgrade-cta">
                <div className="cta-content">
                  <h2>Ready to Start Making Money?</h2>
                  <p>
                    Upgrade to Premium and unlock monetization tools in seconds
                  </p>

                  <button className="upgrade-button" onClick={handleUpgrade}>
                    <span className="button-icon">🚀</span>
                    Upgrade to Premium - Start Monetizing
                  </button>

                  <div className="cta-features">
                    <div className="feature-item">
                      ✓ Instant access to payment processing
                    </div>
                    <div className="feature-item">
                      ✓ Create unlimited pricing plans
                    </div>
                    <div className="feature-item">
                      ✓ Keep 97% of revenue (3% processing fee)
                    </div>
                  </div>

                  <p className="cta-note">
                    30-day money-back guarantee • No setup fees
                  </p>
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
