import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";
import logo from "../assets/logo.png";
import { signInWithPopup } from "firebase/auth";
import {googleProvider, appleProvider } from "../firebase";

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
};

export const signInWithApple = async () => {
  try {
    await signInWithPopup(auth, appleProvider);
  } catch (err) {
    console.error(err);
  }
};


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Logo */}
      <div className="auth-logo">
        <img src={logo} alt="sportex"  onClick={() => navigate("/")}/>
        <h2  onClick={() => navigate("/")}>sportex</h2>
      </div>

      {/* Card */}
      <div className="auth-card">
        <h1>Welcome</h1>
        <p className="auth-subtitle">Sign in to find your next game</p>

        {/* TOGGLE */}
        <div className="auth-toggle">
          <button className="active">Sign In</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="social-auth">
  <button
    className="social-btn"
    onClick={signInWithGoogle}
    aria-label="Continue with Google"
  >
    <img src="/icons/google.svg" alt="Google" />
  </button>

  <button
    className="social-btn"
    onClick={signInWithApple}
    aria-label="Continue with Apple"
  >
    <img src="/icons/apple.svg" alt="Apple" />
  </button>
</div>

          <button className="auth-main-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          By continuing, you agree to our{" "}
          <span>Terms of Service</span> and <span>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
