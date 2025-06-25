import React from "react";
import "./ProgressBar.css";

function ProgressBar({ currentStep, totalSteps, steps }) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-container">
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
