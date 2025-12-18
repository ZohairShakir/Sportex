// pages/CreateMatch.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, rtdb } from "../firebase";
import { ref, push, get, update } from "firebase/database";
import Footer from "../components/footer"
import Navbar from "../components/Navbar";
import "./CreateMatch.css";

/* 🔹 Rank utility (temporary inline – we’ll extract later) */
const RANKS = [
  { name: "Bronze", min: 0 },
  { name: "Silver", min: 200 },
  { name: "Gold", min: 500 },
  { name: "Platinum", min: 900 },
  { name: "Diamond", min: 1400 },
  { name: "Elite", min: 2000 },
];

const getRankFromXP = (xp) => {
  let rank = RANKS[0].name;
  for (let r of RANKS) {
    if (xp >= r.min) rank = r.name;
  }
  return rank;
};

export default function CreateMatch() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sport: "",
    location: "",
    date: "",
    time: "",
    playersRequired: "",
    level: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createMatch = async () => {
    if (!auth.currentUser) return;

    if (
      !form.name ||
      !form.sport ||
      !form.location ||
      !form.date ||
      !form.time ||
      !form.playersRequired ||
      !form.level
    ) {
      alert("Please fill all fields");
      return;
    }

    const user = auth.currentUser;
    const userRef = ref(rtdb, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      alert("User profile not found");
      return;
    }

    const userData = snapshot.val();
    const creatorName = userData.name || "Unknown";

    /* 🔹 XP LOGIC (HOST MATCH = +40 XP) */
    const currentXP = userData.xp || 0;
    const newXP = currentXP + 40;
    const newRank = getRankFromXP(newXP);

    /* 🔹 Create match */
    await push(ref(rtdb, "matches"), {
      title: form.name,
      sport: form.sport,
      location: form.location,
      date: form.date,
      time: form.time,
      playersRequired: form.playersRequired,
      level: form.level,

      creatorId: user.uid,
      creatorName: creatorName,

      players: [user.uid],
      createdAt: Date.now(),
    });

    /* 🔹 Update user XP + rank */
    await update(userRef, {
      xp: newXP,
      rank: newRank,
      matchesHosted: (userData.matchesHosted || 0) + 1,
    });

    navigate("/home");
  };

  return (
    <>
      <Navbar />

      <div className="create-match-page">
        <div className="create-card">
          <h2>Match Details</h2>
          <p className="subtitle">
            Provide information about your game to help players find you
          </p>

          <label>Match Name</label>
          <input
            name="name"
            placeholder="e.g. Sunday Football Scrim"
            value={form.name}
            onChange={handleChange}
          />

          <label>Sport</label>
          <select name="sport" value={form.sport} onChange={handleChange}>
            <option value="">Select a sport</option>
            <option>Football</option>
            <option>Cricket</option>
            <option>Basketball</option>
            <option>Tennis</option>
          </select>

          <label>Location</label>
          <input
            name="location"
            placeholder="e.g. Central Park, Court 3"
            value={form.location}
            onChange={handleChange}
          />

          <div className="row">
            <div>
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Players Needed</label>
              <input
                type="number"
                name="playersRequired"
                placeholder="e.g. 5"
                value={form.playersRequired}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Skill Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
              >
                <option value="">Select level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <button className="create-match-btn" onClick={createMatch}>
            Create Match
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
