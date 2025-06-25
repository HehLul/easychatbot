import React, { useState, useEffect } from "react";
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

      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-avatar">
            {customization.avatar ? (
              <img src={customization.avatar} alt="Bot avatar" />
            ) : (
              <div className="default-avatar">🤖</div>
            )}
          </div>
          <div className="chat-info">
            <h3 className="chat-title">
              {customization.title || "My Chatbot"}
            </h3>
            <p className="chat-subtitle">
              {customization.subtitle || "How can I help you today?"}
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${
                message.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              <div className="message-bubble">{message.text}</div>
            </div>
          ))}

          {/* Suggested Questions */}
          {messages.length <= 1 &&
            customization.suggestedQuestions?.length > 0 && (
              <div className="suggested-questions">
                <p className="suggestions-label">Suggested questions:</p>
                <div className="suggestions-list">
                  {customization.suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="suggestion-button"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Chat Input */}
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <input
              type="text"
              className="chat-input"
              placeholder={
                customization.inputPlaceholder || "Type your message..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="send-button" onClick={handleSendMessage}>
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBotPreview;
