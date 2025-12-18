import '../styles/landing.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, rtdb } from "../firebase";

const Sportex = () => {
  const navigate = useNavigate();
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo-section">
            <div className="logo-icon">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <span className="logo-text">Sportex</span>
          </div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#careers">Careers</a>
          </div>
          <div className="nav-actions">
            <a href="#" className="login-btn" onClick={() => navigate("/login")}>Log In</a>
            <a href="#" className="cta-btn" onClick={() => navigate("/signup")}>Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <img 
          className="hero-video-bg" 
          alt="Cinematic shot of athletes training in a gym with neon lighting"
          src="back.png"
        />
        <div className="hero-content">
          <div className="hero-badge fade-in-up">
            <span className="badge-dot"></span>
            <span>The #1 Sports Platform</span>
          </div>
          <h1 className="hero-title fade-in-up delay-100">
            SPORT<span className="highlight">EX</span>
          </h1>
          <p className="hero-subtitle fade-in-up delay-200">
            Where elite athletes and professional coaches connect to build the future of sports performance.
          </p>
          <div className="hero-buttons fade-in-up delay-300">
            <button className="btn-primary" onClick={() => navigate("/signup")}>
              Join as Athlete
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="btn-secondary">
              Join as Coach
              <span className="material-symbols-outlined">person_add</span>
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="features-decoration"></div>
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Why Sportex?</h2>
              <p>Engineered for performance, designed for connection.</p>
            </div>
            <a href="#" className="view-all-link">
              View all features
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </a>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <h3>Real-Time Matchmaking</h3>
              <p>Connect instantly with partners that match your skill level and goals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <h3>Verified Profiles</h3>
              <p>Every coach and athlete is vetted to ensure a high-quality community.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h3>Performance AI</h3>
              <p>Smart analytics that track your progress and suggest improvements.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined">security</span>
              </div>
              <h3>Secure & Fast</h3>
              <p>Built on modern infrastructure ensuring your data is safe and accessible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          <div className="section-header text-center">
            <h2>Choose Your Plan</h2>
            <p>Flexible pricing for athletes at every stage of their journey.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card starter">
              <div className="card-header">
                <h3>Starter</h3>
                <div className="price">
                  <span className="amount">$0</span>
                  <span>/month</span>
                </div>
                <p>Perfect for getting started and exploring the community.</p>
              </div>
              <ul>
                <li><span className="material-symbols-outlined">check_circle</span>Basic Athlete Profile</li>
                <li><span className="material-symbols-outlined">check_circle</span>3 Sessions per month</li>
                <li><span className="material-symbols-outlined">check_circle</span>Standard Matchmaking</li>
                <li><span className="material-symbols-outlined">cancel</span>Advanced Analytics</li>
              </ul>
              <button className="btn-outline" onClick={() => navigate("/signup")}>Get Started</button>
            </div>
            <div className="pricing-card pro popular">
              <div className="popular-badge">Most Popular</div>
              <div className="card-header">
                <h3>
                  Pro Athlete
                  <span className="material-symbols-outlined">star</span>
                </h3>
                <div className="price">
                  <span className="amount">$29</span>
                  <span>/month</span>
                </div>
                <p>Unlock your full potential with advanced tools.</p>
              </div>
              <ul>
                <li><span className="material-symbols-outlined">check_circle</span>Everything in Starter</li>
                <li><span className="material-symbols-outlined">check_circle</span>Unlimited Sessions</li>
                <li><span className="material-symbols-outlined">check_circle</span>AI Performance Analytics</li>
                <li><span className="material-symbols-outlined">check_circle</span>Priority Matchmaking</li>
              </ul>
              <button className="btn-primary">Upgrade Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="careers-section" id="careers">
        <div className="careers-decoration"></div>
        <div className="container">
          <div className="section-header">
            <h2>Build the Future of Sports Tech</h2>
            <p>We are looking for passionate individuals to join our mission.</p>
          </div>
          <div className="careers-grid">
            <div className="career-card developer">
              <div className="career-icon-bg">
                <span className="material-symbols-outlined">terminal</span>
              </div>
              <div className="career-content">
                <div className="career-header">
                  <div className="career-badge">
                    <span className="material-symbols-outlined">code</span>
                  </div>
                  <h3>Join as Developer</h3>
                  <p>Help us build the scalable infrastructure that powers thousands of athletic connections daily.</p>
                </div>
                <a href="#" className="career-link">
                  View Openings
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="career-card team">
              <div className="career-icon-bg">
                <span className="material-symbols-outlined">diversity_3</span>
              </div>
              <div className="career-content">
                <div className="career-header">
                  <div className="career-badge">
                    <span className="material-symbols-outlined">groups</span>
                  </div>
                  <h3>Join the Team</h3>
                  <p>Marketing, Sales, Operations. If you love sports and tech, we have a place for you.</p>
                </div>
                <a href="#" className="career-link">
                  See All Roles
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="material-symbols-outlined">bolt</span>
                <span>Sportex</span>
              </div>
              <p>Empowering the next generation of athletes through technology and community connection.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Platform</h4>
                <a href="#">Home</a>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#">About Us</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2024 Sportex All rights reserved.</span>
            <div className="social-links">
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.9c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fillRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sportex;
