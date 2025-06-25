import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import "./TrainPage.css";

function TrainPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    instructions: "",
    additionalDetails: "",
    files: [],
  });
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const steps = ["Train", "Customize", "Deploy"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).filter((file) => {
      const validTypes = [".txt", ".pdf", ".docx", ".md"];
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();
      return (
        validTypes.includes(fileExtension) && file.size <= 10 * 1024 * 1024
      ); // 10MB limit
    });

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.instructions.trim()) {
      alert("Please provide instructions for your chatbot");
      return;
    }

    // Save form data (localStorage for now)
    localStorage.setItem("chatbotTrainingData", JSON.stringify(formData));
    navigate("/customize");
  };

  const isFormValid = formData.instructions.trim().length > 0;

  return (
    <div className="train-page">
      <div className="container">
        <ProgressBar currentStep={1} totalSteps={3} steps={steps} />

        <div className="train-content">
          <div className="section-header text-center">
            <h1>Train your AI Chatbot</h1>
            <p className="text-secondary">
              Provide instructions and training materials to customize your
              chatbot's behavior and knowledge.
            </p>
          </div>

          <form onSubmit={handleNextStep} className="train-form">
            {/* Main Instructions Section */}
            <div className="form-section">
              <div className="section-title">
                <h3>Primary Instructions</h3>
                <p className="text-secondary text-sm">
                  Describe what your chatbot should do and how it should behave
                </p>
              </div>

              <div className="form-group">
                <textarea
                  className="instruction-input"
                  placeholder="Example: You are a helpful customer support assistant for an e-commerce store. Always be polite, provide clear answers, and if you don't know something, direct users to contact human support."
                  value={formData.instructions}
                  onChange={(e) =>
                    handleInputChange("instructions", e.target.value)
                  }
                  rows="6"
                />
                <div className="input-footer">
                  <span className="character-count text-sm text-muted">
                    {formData.instructions.length} / 2000 characters
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="form-section">
              <button
                type="button"
                className="section-toggle"
                onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
              >
                <span>Additional Details</span>
                <span
                  className={`toggle-icon ${
                    showAdditionalDetails ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {showAdditionalDetails && (
                <div className="additional-details">
                  <p className="text-secondary text-sm mb-4">
                    Add specific guidelines, tone preferences, or domain
                    knowledge
                  </p>
                  <textarea
                    className="details-input"
                    placeholder="Example: Always maintain a friendly but professional tone. When discussing pricing, mention our current 20% discount. If asked about refunds, explain our 30-day return policy."
                    value={formData.additionalDetails}
                    onChange={(e) =>
                      handleInputChange("additionalDetails", e.target.value)
                    }
                    rows="4"
                  />
                </div>
              )}
            </div>

            {/* File Upload Section */}
            <div className="form-section">
              <div className="section-title">
                <h3>Training Files</h3>
                <p className="text-secondary text-sm">
                  Upload documents to give your chatbot additional knowledge
                </p>
              </div>

              <div
                className={`file-upload-area ${
                  dragActive ? "drag-active" : ""
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="upload-content">
                  <div className="upload-icon">📄</div>
                  <p className="upload-text">
                    Drag & drop files here, or{" "}
                    <label className="upload-link">
                      browse files
                      <input
                        type="file"
                        multiple
                        accept=".txt,.pdf,.docx,.md"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        style={{ display: "none" }}
                      />
                    </label>
                  </p>
                  <p className="upload-note text-sm text-muted">
                    Supports: TXT, PDF, DOCX, MD (Max 10MB each)
                  </p>
                </div>
              </div>

              {formData.files.length > 0 && (
                <div className="uploaded-files">
                  <h4 className="files-title">Uploaded Files</h4>
                  <div className="files-list">
                    {formData.files.map((file, index) => (
                      <div key={index} className="file-item">
                        <div className="file-info">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size text-sm text-muted">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                        <button
                          type="button"
                          className="remove-file"
                          onClick={() => removeFile(index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="form-navigation">
              <button
                type="submit"
                className={`btn-primary btn-lg ${
                  !isFormValid ? "opacity-50" : ""
                }`}
                disabled={!isFormValid}
              >
                Next Step: Customize
              </button>
              <p className="text-sm text-muted text-center mt-4">
                Your progress is automatically saved
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TrainPage;
