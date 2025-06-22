import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import {
  Menu,
  X,
  Send,
  Bot,
  Zap,
  CreditCard,
  Database,
  Clock,
  BarChart3,
  Shield,
  DollarSign,
  Check,
  ArrowRight,
  ArrowDown,
  Star,
  Quote,
  Rocket,
  Twitter,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import "./LandingPage.css";
// import styles from "./LandingPage.css";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [demoResponse, setDemoResponse] = useState("");

  //navigate to auth page when input is sent
  const navigate = useNavigate();
  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    navigate("/auth");
  };

  const examplePrompts = [
    "Create a customer support chatbot for my e-commerce store",
    "Build a fitness coaching AI that can sell workout plans",
    "Make a baking recipe chatbot",
  ];

  const navigation = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#process" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
  ];

  const features = [
    {
      icon: <Bot className="icon-size" />,
      title: "AI-Powered Chatbots",
      description:
        "Create intelligent chatbots that understand context and provide human-like responses to your customers.",
      color: "blue",
    },
    {
      icon: <CreditCard className="icon-size" />,
      title: "Built-in Stripe Integration",
      description:
        "Accept payments instantly. Stripe is pre-configured so your chatbot can start making money from day one.",
      color: "green",
    },
    {
      icon: <Database className="icon-size" />,
      title: "Database Included",
      description:
        "Store customer data, chat history, and analytics with our integrated database solution. No setup required.",
      color: "purple",
    },
    {
      icon: <Zap className="icon-size" />,
      title: "Deploy in Minutes",
      description:
        "From idea to live chatbot in under 3 minutes. No coding, no complex setup, no hosting headaches.",
      color: "orange",
    },
    {
      icon: <BarChart3 className="icon-size" />,
      title: "Real-time Analytics",
      description:
        "Track conversations, revenue, and user engagement with detailed analytics and reporting.",
      color: "indigo",
    },
    {
      icon: <Shield className="icon-size" />,
      title: "Enterprise Security",
      description:
        "Bank-level security with encryption, compliance, and data protection built into every chatbot.",
      color: "red",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Describe Your Chatbot",
      description:
        "Tell us what you want your AI to do. Customer support? Lead generation? Sales? Course delivery? We handle the rest.",
      features: [
        "Natural language input",
        "AI understands your vision",
        "No technical knowledge needed",
      ],
    },
    {
      number: "02",
      title: "Customize & Configure",
      description:
        "Set your pricing, connect your brand, and customize responses. Our visual editor makes it simple.",
      features: [
        "Drag & drop customization",
        "Brand integration",
        "Pricing configuration",
        "Payment setup",
      ],
    },
    {
      number: "03",
      title: "Deploy & Start Earning",
      description:
        "Your chatbot goes live instantly with payments enabled. Share the link and start making money immediately.",
      features: [
        "Instant deployment",
        "Stripe payments active",
        "Analytics dashboard",
        "Revenue tracking",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Fitness Coach",
      avatar: "SC",
      rating: 5,
      content:
        "I launched my AI fitness coaching chatbot in 2 minutes and made my first $500 the same day. The Stripe integration is seamless!",
      revenue: "$12K/month",
    },
    {
      name: "Marcus Rodriguez",
      role: "Course Creator",
      avatar: "MR",
      rating: 5,
      content:
        "DeepSheep made it incredibly easy to create an AI that sells my courses. No coding needed, and it handles everything from support to payments.",
      revenue: "$8K/month",
    },
    {
      name: "Jennifer Walsh",
      role: "E-commerce Owner",
      avatar: "JW",
      rating: 5,
      content:
        "Our customer support chatbot has increased sales by 40% while reducing support tickets by 60%. ROI was immediate.",
      revenue: "$25K/month",
    },
    {
      name: "David Kim",
      role: "Digital Marketer",
      avatar: "DK",
      rating: 5,
      content:
        "I built 5 different chatbots for clients using DeepSheep. Each one generates passive income. This platform is a game-changer.",
      revenue: "$15K/month",
    },
    {
      name: "Lisa Thompson",
      role: "Consultant",
      avatar: "LT",
      rating: 5,
      content:
        "The database integration saved me weeks of development. My AI consultant is available 24/7 and books meetings automatically.",
      revenue: "$18K/month",
    },
    {
      name: "Alex Johnson",
      role: "SaaS Founder",
      avatar: "AJ",
      rating: 5,
      content:
        "We replaced our expensive customer success team with a DeepSheep chatbot. Same quality, fraction of the cost, 24/7 availability.",
      revenue: "$30K saved/month",
    },
  ];

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#process" },
      { name: "Pricing", href: "#pricing" },
      { name: "Templates", href: "#templates" },
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
    resources: [
      { name: "Documentation", href: "#docs" },
      { name: "Help Center", href: "#help" },
      { name: "Community", href: "#community" },
      { name: "API", href: "#api" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" },
    ],
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <img src={logo}></img>
              <span className="logo-text">DeepSheep</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="nav-desktop">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="nav-link">
                  {item.name}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="header-buttons">
              <button className="btn-ghost">Sign In</button>
              <button className="btn-primary">Start Free</button>
            </div>

            {/* Mobile menu button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="nav-mobile">
              <nav className="mobile-nav">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="mobile-buttons">
                  <button className="btn-ghost">Sign In</button>
                  <button className="btn-primary">Start Free</button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            {/* Badge */}
            <div className="hero-badge">
              <Zap className="badge-icon" />
              No coding required • Launch in 3 minutes
            </div>

            {/* Main headline */}
            <h1 className="hero-title">
              Launch Your <span className="gradient-text">Money-Making</span>
              <br />
              AI Chatbot in 3 Minutes
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Build, customize, and monetize your own AI chatbot without any
              coding.
              <br />
              <span className="subtitle-emphasis">
                Complete with Stripe payments & database integration.
              </span>
            </p>

            {/* Trust indicators */}
            <div className="trust-indicators">
              <div className="trust-item">
                <CreditCard className="trust-icon green" />
                Stripe Integration Built-in
              </div>
              <div className="trust-item">
                <Database className="trust-icon blue" />
                Database Included
              </div>
              <div className="trust-item">
                <Clock className="trust-icon purple" />
                Deploy in Minutes
              </div>
            </div>

            {/* Interactive Demo Section */}
            <div className="demo-section">
              <div className="demo-container">
                {/* Demo Header */}
                <div className="demo-header">
                  <div className="demo-header-content">
                    <Bot className="demo-icon" />
                    <h3 className="demo-title">
                      Try Your AI Chatbot Now - Start Building Your Business
                    </h3>
                  </div>
                </div>

                {/* Chat Interface */}
                <div className="demo-chat">
                  <form onSubmit={handlePromptSubmit} className="demo-form">
                    <div className="input-container">
                      <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your AI chatbot idea... (e.g., 'A fitness coach that sells workout plans')"
                        className="demo-input"
                      />
                      <button
                        type="submit"
                        className="send-btn"
                        disabled={!prompt.trim() || isTyping}
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Example prompts */}
                    <div className="example-prompts">
                      <span className="prompts-label">Try:</span>
                      {examplePrompts.map((example, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setPrompt(example)}
                          className="example-prompt"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </form>

                  {/* Demo Response */}
                  {(isTyping || demoResponse) && (
                    <div className="demo-response">
                      <div className="response-content">
                        <div className="response-avatar">
                          <span>🤖</span>
                        </div>
                        <div className="response-text">
                          {isTyping ? (
                            <div className="typing-indicator">
                              <div className="typing-dot"></div>
                              <div className="typing-dot"></div>
                              <div className="typing-dot"></div>
                            </div>
                          ) : (
                            <p>{demoResponse}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Main CTA */}
              <div className="hero-cta">
                <button className="btn-cta">
                  Start Building Free - No Credit Card Required
                </button>
                {/* <p className="cta-note">
                  Join 10,000+ creators already making money with AI chatbots
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Everything You Need to Launch Your AI Business
            </h2>
            <p className="section-subtitle">
              We've built the complete infrastructure so you can focus on
              creating amazing chatbot experiences that generate revenue.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className={`feature-icon ${feature.color}`}>
                  <span>{feature.icon}</span>
                </div>

                <h3 className="feature-title">{feature.title}</h3>

                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Revenue Focus Section */}
          <div className="revenue-section">
            <div className="revenue-content">
              <div className="revenue-badge">
                <DollarSign className="badge-icon" />
                Revenue-Focused Platform
              </div>

              <h3 className="revenue-title">
                Built for Monetization from Day One
              </h3>

              <p className="revenue-description">
                Unlike other chatbot builders, DeepSheep is designed
                specifically for creators and businesses who want to generate
                revenue with AI. Every feature is optimized for conversion and
                growth.
              </p>

              <div className="revenue-stats">
                <div className="stat">
                  <div className="stat-number green">$0</div>
                  <div className="stat-label">Setup costs</div>
                </div>
                <div className="stat">
                  <div className="stat-number blue">3min</div>
                  <div className="stat-label">To first revenue</div>
                </div>
                <div className="stat">
                  <div className="stat-number purple">∞</div>
                  <div className="stat-label">Earning potential</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="process">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              From Idea to Income in 3 Simple Steps
            </h2>
            <p className="section-subtitle">
              Our streamlined process gets you from concept to cash flow faster
              than any other platform. Everything is automated and optimized for
              revenue generation.
            </p>
          </div>

          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step">
                <div
                  className={`step-content ${index % 2 === 1 ? "reverse" : ""}`}
                >
                  {/* Step Content */}
                  <div className="step-text">
                    <div className="step-header">
                      <div className="step-number">{step.number}</div>
                      <h3 className="step-title">{step.title}</h3>
                    </div>

                    <p className="step-description">{step.description}</p>

                    <ul className="step-features">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="step-feature">
                          <Check className="feature-check" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Step Visual */}
                  <div className="step-visual">
                    <div className="step-card">
                      <div className="step-card-content">
                        <div
                          className={`step-icon ${
                            index === 0
                              ? "blue"
                              : index === 1
                              ? "purple"
                              : "green"
                          }`}
                        >
                          <span>{step.number}</span>
                        </div>
                        <div className="step-label">
                          Step {step.number.replace("0", "")}
                        </div>
                      </div>

                      {/* Connecting Arrow */}
                      {index < steps.length - 1 && (
                        <div className="step-arrow">
                          <ArrowRight className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="mobile-arrow">
                    <ArrowDown className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="process-cta">
            <div className="process-cta-content">
              <h3 className="process-cta-title">
                Ready to Build Your Revenue-Generating AI?
              </h3>
              <p className="process-cta-description">
                Join thousands of creators and businesses already earning with
                DeepSheep chatbots.
              </p>
              <button className="btn-cta">Start Your Free Chatbot Now</button>
              <p className="process-cta-note">
                No credit card required • Full access to all features • Deploy
                in minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Beta Success Stories</h2>
            <p className="section-subtitle">
              See how creators and businesses are using DeepSheep to build
              profitable AI chatbots and generate substantial revenue streams.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                {/* Quote Icon */}
                <Quote className="quote-icon" />

                {/* Rating */}
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star" />
                  ))}
                </div>

                {/* Content */}
                <p className="testimonial-content">"{testimonial.content}"</p>

                {/* User Info */}
                <div className="testimonial-footer">
                  <div className="user-info">
                    <div className="user-avatar">{testimonial.avatar}</div>
                    <div className="user-details">
                      <div className="user-name">{testimonial.name}</div>
                      <div className="user-role">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Revenue Badge */}
                  <div className="revenue-badge">{testimonial.revenue}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="testimonials-stats">
            <div className="stats-content">
              <h3 className="stats-title">Join the AI Revenue Revolution</h3>
              <p className="stats-description">
                Thousands of users are already building profitable AI businesses
                with DeepSheep
              </p>

              <div className="stats-grid">
                <div className="stat">
                  <div className="stat-number blue">10K+</div>
                  <div className="stat-label">Active Chatbots</div>
                </div>
                <div className="stat">
                  <div className="stat-number green">$2M+</div>
                  <div className="stat-label">Revenue Generated</div>
                </div>
                <div className="stat">
                  <div className="stat-number purple">99.9%</div>
                  <div className="stat-label">Uptime</div>
                </div>
                <div className="stat">
                  <div className="stat-number orange">3min</div>
                  <div className="stat-label">Avg. Setup Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta-content">
            <div className="cta-badge">
              <Rocket className="badge-icon" />
              Launch Your AI Business Today
            </div>

            <h2 className="cta-title">
              Stop Dreaming About AI Revenue.
              <br />
              <span className="title-highlight">Start Earning Today.</span>
            </h2>

            <p className="cta-description">
              While others spend months learning to code, you can build and
              deploy your money-making AI chatbot in the next 3 minutes.
              Everything is included.
            </p>

            {/* Feature highlights */}
            <div className="cta-features">
              <div className="cta-feature">
                <CreditCard className="cta-feature-icon" />
                <div className="cta-feature-title">Stripe Ready</div>
                <div className="cta-feature-desc">
                  Accept payments instantly
                </div>
              </div>
              <div className="cta-feature">
                <Database className="cta-feature-icon" />
                <div className="cta-feature-title">Database Included</div>
                <div className="cta-feature-desc">Store data automatically</div>
              </div>
              <div className="cta-feature">
                <Zap className="cta-feature-icon" />
                <div className="cta-feature-title">Deploy Instantly</div>
                <div className="cta-feature-desc">Live in under 3 minutes</div>
              </div>
            </div>

            {/* Main CTA */}
            <div className="cta-action">
              <button className="btn-final-cta">
                Build Your AI Chatbot Now - Free
              </button>

              <div className="cta-benefits">
                <div className="benefit">✓ No credit card required</div>
                <div className="benefit">✓ No coding knowledge needed</div>
                <div className="benefit">✓ Start earning in minutes</div>
              </div>

              <p className="cta-disclaimer">
                Join 10,000+ entrepreneurs who chose DeepSheep to build their
                AI-powered income streams. Our seamless Stripe and database
                integration means you focus on growth, not technical setup.
              </p>
            </div>

            {/* Urgency element */}
            <div className="urgency-banner">
              <div className="urgency-title">
                🔥 Limited Time: Free Pro Features
              </div>
              <div className="urgency-desc">
                All new accounts get premium features free for 30 days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          {/* Main footer content */}
          <div className="footer-content">
            {/* Brand section */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <Bot className="h-5 w-5" />
                </div>
                <span className="footer-logo-text">DeepSheep</span>
              </div>
              <p className="footer-description">
                The fastest way to build, deploy, and monetize AI chatbots.
                Complete with Stripe payments and database integration.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="social-link">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="social-link">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="social-link">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product links */}
            <div className="footer-column">
              <h3 className="footer-column-title">Product</h3>
              <ul className="footer-links">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div className="footer-column">
              <h3 className="footer-column-title">Company</h3>
              <ul className="footer-links">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources links */}
            <div className="footer-column">
              <h3 className="footer-column-title">Resources</h3>
              <ul className="footer-links">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div className="footer-column">
              <h3 className="footer-column-title">Legal</h3>
              <ul className="footer-links">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="copyright">
                © 2024 DeepSheep. All rights reserved.
              </div>
              <div className="footer-tagline">
                Built for creators, businesses, and entrepreneurs who want to
                profit from AI.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
