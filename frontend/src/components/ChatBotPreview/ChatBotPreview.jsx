import React, { useState, useEffect } from "react";
import { Plus, MessageCircle, PanelLeftOpen, Settings } from "lucide-react";
import "./ChatBotPreview.css";

function ChatBotPreview({ customization }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Initialize with initial message if provided
    if (customization.initialMessage) {
      setMessages([
        {
          id: 1,
          text: customization.initialMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [customization.initialMessage]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "This is a preview of how your bot will respond to messages.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question) => {
    const newMessage = {
      id: messages.length + 1,
      text: question,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: `Thanks for asking "${question}". This is how your bot would respond to this question.`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const chatStyle = {
    "--primary-color": customization.primaryColor,
    "--secondary-color": customization.secondaryColor,
    "--background-color": customization.backgroundColor,
    "--user-bubble-color": customization.userBubbleColor,
    "--bot-bubble-color": customization.botBubbleColor,
    "--font-size":
      customization.fontSize === "small"
        ? "14px"
        : customization.fontSize === "large"
        ? "18px"
        : "16px",
  };

  return (
    <div className="chat-preview" style={chatStyle}>
      <div className="preview-label">
        <span>Live Preview</span>
      </div>
      <div className="container">
        <div className="side-nav">
          {/* <svg src={PanelLeftOpen} alt="" /> */}
          <PanelLeftOpen></PanelLeftOpen>
          <Plus></Plus>
          <MessageCircle></MessageCircle>
          <Settings></Settings>
        </div>

        <div className="landing-container">
          {/* Navigation Bar */}
          <nav className="chat-navbar">
            <div className="navbar-content">
              <div className="navbar-brand">
                <div className="brand-avatar">
                  {customization.avatar ? (
                    <img src={customization.avatar} alt="Bot avatar" />
                  ) : (
                    <div className="default-brand-avatar">LOGO</div>
                  )}
                </div>
                <span className="brand-name">
                  {customization.title || "My Chatbot"}
                </span>
              </div>
              <div className="navbar-actions">
                <button className="nav-button">Get Pro</button>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <h1>{customization.title || "The Best Chatbot"}</h1>
              <h3>
                {customization.description ||
                  "Knowledge merged from 10,000+ sources"}
              </h3>
              <h1 className="hero-title">
                {customization.subtitle || "What can I help with?"}
              </h1>
              {customization.description && (
                <p className="hero-description">{customization.description}</p>
              )}
            </div>
          </section>

          {/* Chat Interface */}
          <section className="chat-section">
            <div className="chat-container">
              <div className="chat-input-area">
                <div className="chat-input-wrapper">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder={
                      customization.inputPlaceholder || "Ask anything"
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <div className="input-actions">
                    <button className="action-button">🔍</button>
                    <button className="action-button">💡</button>
                    <button className="send-button" onClick={handleSendMessage}>
                      ↗
                    </button>
                  </div>
                </div>

                {/* Suggested Questions */}
                {messages.length === 0 &&
                  customization.suggestedQuestions?.length > 0 && (
                    <div className="suggested-questions">
                      <p className="suggestions-label">Try:</p>
                      <div className="suggestions-grid">
                        {customization.suggestedQuestions.map(
                          (question, index) => (
                            <button
                              key={index}
                              className="suggestion-pill"
                              onClick={() => handleSuggestedQuestion(question)}
                            >
                              {question}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* Chat Messages */}
              {messages.length > 0 && (
                <div className="chat-messages">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${
                        message.sender === "user"
                          ? "user-message"
                          : "bot-message"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="message-avatar">
                          {customization.avatar ? (
                            <img src={customization.avatar} alt="Bot" />
                          ) : (
                            <div className="default-message-avatar">🤖</div>
                          )}
                        </div>
                      )}
                      <div className="message-bubble">{message.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ChatBotPreview;
