import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, rtdb } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import "./Signup.css";
import logo from "../assets/logo.png";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, appleProvider } from "../firebase";

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


export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true); 
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    await setPersistence(
  auth,
  remember ? browserLocalPersistence : browserSessionPersistence
);

await createUserWithEmailAndPassword(auth, email, password);

    e.preventDefault();
    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save user profile
      await set(ref(rtdb, "users/" + userCred.user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      navigate("/home");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Logo */}
      <div className="auth-logo">
        <img src={logo} alt="sportex" onClick={() => navigate("/")}/>
        <h2  onClick={() => navigate("/")}>sportex</h2>
      </div>

      {/* Card */}
      <div className="auth-card">
        <h1>Welcome</h1>
        <p className="auth-subtitle">Create an account to get started</p>

        {/* TOGGLE */}
        <div className="auth-toggle">
          <button onClick={() => navigate("/login")}>Sign In</button>
          <button className="active">Sign Up</button>
        </div>

        <form onSubmit={handleSignup}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
          </div>

          <div className="social-auth">
          <button
              className="social-btn"
              onClick={signInWithGoogle}
              aria-label="Continue with Google"
            >
              <img src="/icons/google.svg" alt= "Google" />
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
            {loading ? "Creating account..." : "Sign Up"}
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
