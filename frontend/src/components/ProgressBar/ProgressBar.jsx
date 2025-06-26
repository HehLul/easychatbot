import React from "react";
import "./ProgressBar.css";

function ProgressBar({
  currentStep,
  totalSteps,
  steps,
  onBack,
  onNext,
  onSkipToDashboard,
  canGoBack = true,
  canGoNext = true,
  showSkip = true,
  nextButtonText = "Next",
  backButtonText = "Back",
}) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-container">
      {/* Navigation Buttons */}
      <div className="progress-navigation">
        <div className="nav-left">
          {currentStep > 1 && canGoBack && (
            <button className="nav-btn btn-back" onClick={onBack}>
              ← {backButtonText}
            </button>
          )}
        </div>

        <div className="nav-center">
          {showSkip && (
            <button className="nav-btn btn-skip" onClick={onSkipToDashboard}>
              Skip to Dashboard
            </button>
          )}
        </div>

        <div className="nav-right">
          {currentStep < totalSteps && canGoNext && (
            <button className="nav-btn btn-next" onClick={onNext}>
              {nextButtonText} →
            </button>
          )}
          {currentStep === totalSteps && (
            <button className="nav-btn btn-finish" onClick={onSkipToDashboard}>
              Go to Dashboard
            </button>
          )}
        </div>
      </div>
      <div className="progress-header">
        <span className="progress-text">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="progress-percentage">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="progress-steps">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              className={`progress-step ${isCompleted ? "completed" : ""} ${
                isCurrent ? "current" : ""
              }`}
            >
              <div className="step-number">
                {isCompleted ? "✓" : stepNumber}
              </div>
              <span className="step-label">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
