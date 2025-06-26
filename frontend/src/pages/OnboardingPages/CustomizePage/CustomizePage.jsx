import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import ChatBotPreview from "../../../components/ChatBotPreview/ChatBotPreview";
import "./CustomizePage.css";

function CustomizePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("setup");
  const [customization, setCustomization] = useState({
    // Basic Information
    title: "Best Chatbot",
    subtitle: "How can I help you today?",
    description: "We've trained this chatbot with 10,000+ sources",
    inputPlaceholder: "Type your message...",

    // Visual Styling
    primaryColor: "#000",
    secondaryColor: "#7c3aed",
    backgroundColor: "fff",
    userBubbleColor: "#000",
    botBubbleColor: "#ffffff",
    fontSize: "medium",
    avatar: null,

    // Behavior Settings
    initialMessage: "Hello! How can I assist you today?",
    suggestedQuestions: [],
  });

  const [newSuggestion, setNewSuggestion] = useState("");

  const tabs = [
    { id: "setup", label: "Setup", icon: "⚙️" },
    { id: "design", label: "Design", icon: "🎨" },
    { id: "behavior", label: "Behavior", icon: "💬" },
  ];

  const steps = ["Train", "Customize", "Deploy"];

  const handleInputChange = (field, value) => {
    setCustomization((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange("avatar", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSuggestedQuestion = () => {
    if (newSuggestion.trim() && customization.suggestedQuestions.length < 4) {
      handleInputChange("suggestedQuestions", [
        ...customization.suggestedQuestions,
        newSuggestion.trim(),
      ]);
      setNewSuggestion("");
    }
  };

  const removeSuggestedQuestion = (index) => {
    handleInputChange(
      "suggestedQuestions",
      customization.suggestedQuestions.filter((_, i) => i !== index)
    );
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    // Save customization data
    localStorage.setItem("chatbotCustomization", JSON.stringify(customization));
    navigate("/launch");
  };

  const presetAvatars = ["🤖", "💬", "🎯", "⭐", "💡", "🔥"];

  return (
    <div className="customize-page">
      <div className="container">
        <ProgressBar currentStep={2} totalSteps={3} steps={steps} />

        <div className="customize-content">
          <div className="section-header text-center">
            <h1>Customize your Chatbot</h1>
            <p className="text-secondary">
              Design the look and feel of your chatbot interface
            </p>
          </div>

          <div className="customize-layout">
            {/* Live Preview */}
            <div className="preview-section">
              <ChatBotPreview customization={customization} />
            </div>
            {/* Customization Form */}
            <div className="customize-form">
              {/* Basic Information */}
              <div className="form-section">
                <div className="section-title">
                  <h3>Basic Information</h3>
                  <p className="text-secondary text-sm">
                    Set your chatbot's identity and basic messaging
                  </p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Chatbot Name</label>
                    <input
                      type="text"
                      value={customization.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="My Chatbot"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Welcome Message</label>
                    <input
                      type="text"
                      value={customization.subtitle}
                      onChange={(e) =>
                        handleInputChange("subtitle", e.target.value)
                      }
                      placeholder="How can I help you today?"
                    />
                  </div>

                  <div className="form-group span-full">
                    <label className="form-label">Description (Optional)</label>
                    <textarea
                      value={customization.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Brief description of what your chatbot does..."
                      rows="2"
                    />
                  </div>

                  <div className="form-group span-full">
                    <label className="form-label">Input Placeholder</label>
                    <input
                      type="text"
                      value={customization.inputPlaceholder}
                      onChange={(e) =>
                        handleInputChange("inputPlaceholder", e.target.value)
                      }
                      placeholder="Type your message..."
                    />
                  </div>
                </div>
              </div>

              {/* Visual Styling */}
              <div className="form-section">
                <div className="section-title">
                  <h3>Visual Styling</h3>
                  <p className="text-secondary text-sm">
                    Customize colors, typography, and avatar
                  </p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Primary Color</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={customization.primaryColor}
                        onChange={(e) =>
                          handleInputChange("primaryColor", e.target.value)
                        }
                        className="color-input"
                      />
                      <span className="color-value">
                        {customization.primaryColor}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Secondary Color</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={customization.secondaryColor}
                        onChange={(e) =>
                          handleInputChange("secondaryColor", e.target.value)
                        }
                        className="color-input"
                      />
                      <span className="color-value">
                        {customization.secondaryColor}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Background Color</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={customization.backgroundColor}
                        onChange={(e) =>
                          handleInputChange("backgroundColor", e.target.value)
                        }
                        className="color-input"
                      />
                      <span className="color-value">
                        {customization.backgroundColor}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">User Bubble Color</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={customization.userBubbleColor}
                        onChange={(e) =>
                          handleInputChange("userBubbleColor", e.target.value)
                        }
                        className="color-input"
                      />
                      <span className="color-value">
                        {customization.userBubbleColor}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Bot Bubble Color</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={customization.botBubbleColor}
                        onChange={(e) =>
                          handleInputChange("botBubbleColor", e.target.value)
                        }
                        className="color-input"
                      />
                      <span className="color-value">
                        {customization.botBubbleColor}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Font Size</label>
                    <select
                      value={customization.fontSize}
                      onChange={(e) =>
                        handleInputChange("fontSize", e.target.value)
                      }
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <div className="form-group span-full">
                    <label className="form-label">Avatar</label>
                    <div className="avatar-section">
                      <div className="preset-avatars">
                        {presetAvatars.map((emoji, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`preset-avatar ${
                              customization.avatar === emoji ? "active" : ""
                            }`}
                            onClick={() => handleInputChange("avatar", emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                      <div className="custom-avatar">
                        <label className="upload-avatar-btn">
                          Upload Custom
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Behavior Settings */}
              <div className="form-section">
                <div className="section-title">
                  <h3>Behavior Settings</h3>
                  <p className="text-secondary text-sm">
                    Configure initial messages and suggested questions
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Initial Message</label>
                  <input
                    type="text"
                    value={customization.initialMessage}
                    onChange={(e) =>
                      handleInputChange("initialMessage", e.target.value)
                    }
                    placeholder="Hello! How can I assist you today?"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Suggested Questions (Max 4)
                  </label>
                  <div className="suggestions-input">
                    <input
                      type="text"
                      value={newSuggestion}
                      onChange={(e) => setNewSuggestion(e.target.value)}
                      placeholder="Add a suggested question..."
                      onKeyPress={(e) =>
                        e.key === "Enter" && addSuggestedQuestion()
                      }
                    />
                    <button
                      type="button"
                      onClick={addSuggestedQuestion}
                      disabled={
                        !newSuggestion.trim() ||
                        customization.suggestedQuestions.length >= 4
                      }
                      className="btn-secondary btn-sm"
                    >
                      Add
                    </button>
                  </div>

                  {customization.suggestedQuestions.length > 0 && (
                    <div className="suggestions-list">
                      {customization.suggestedQuestions.map(
                        (question, index) => (
                          <div key={index} className="suggestion-item">
                            <span>{question}</span>
                            <button
                              type="button"
                              onClick={() => removeSuggestedQuestion(index)}
                              className="remove-suggestion"
                            >
                              ✕
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="form-navigation">
                <button onClick={handleNextStep} className="btn-primary btn-lg">
                  Next Step: Deploy
                </button>
                <p className="text-sm text-muted text-center mt-4">
                  Your customization is automatically saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizePage;
