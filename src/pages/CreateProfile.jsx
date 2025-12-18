// pages/ProfileCreation.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, rtdb } from "../firebase";
import { ref, get, set } from "firebase/database";
import "./ProfilePage.css";

export default function ProfileCreation() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    sport: "",
    location: "",
  });

  // Redirect if already logged in and profile exists
  useEffect(() => {
    const checkProfile = async () => {
      if (!auth.currentUser) return navigate("/login");
      const snapshot = await get(ref(rtdb, "users/" + auth.currentUser.uid));
      if (snapshot.exists()) {
        navigate("/profile"); // already has profile
      } else {
        setProfile((prev) => ({ ...prev, email: auth.currentUser.email }));
      }
    };
    checkProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      await set(ref(rtdb, "users/" + auth.currentUser.uid), profile);
      alert("Profile created!");
      navigate("/profile");
    } catch (err) {
      console.error("Error creating profile:", err);
      alert("Failed to create profile. Try again.");
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Create Your Profile</h1>
      <form className="profile-card" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          disabled
        />

        <label>Sport</label>
        <input
          type="text"
          name="sport"
          value={profile.sport}
          onChange={handleChange}
          placeholder="Football, Cricket…"
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange}
          placeholder="City"
          required
        />

        <button type="submit" className="save-profile-btn">
          Create Profile
        </button>
      </form>
    </div>
  );
}
