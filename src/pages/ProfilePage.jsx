import { useEffect, useState } from "react";
import { auth, rtdb } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer"
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [hosted, setHosted] = useState([]);
  const [joined, setJoined] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    const uid = auth.currentUser.uid;

    // User info
    onValue(ref(rtdb, `users/${uid}`), (snap) => {
      setUserData(snap.val());
    });

    // Matches
    onValue(ref(rtdb, "matches"), (snap) => {
      const data = snap.val();
      if (!data) return;

      const allMatches = Object.entries(data).map(([id, m]) => ({
        id,
        ...m,
        players: m.players || [],
      }));

      setHosted(allMatches.filter((m) => m.creatorId === uid));
      setJoined(allMatches.filter((m) => m.players.includes(uid)));
    });
  }, [navigate]);

  const name = userData?.name || "User";
  const initial = name.charAt(0).toUpperCase();

  return (
    <>
    <Navbar />
    <div className="profile-container">
      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="profile-top">
          <div className="avatar">{initial}</div>
          <h2>{name}</h2>
        </div>

        <div className="profile-stats">
          <div>
            <span>{joined.length}</span>
            <p>Joined</p>
          </div>
          <div>
            <span>{hosted.length}</span>
            <p>Hosted</p>
          </div>
          <div>
            <span>{joined.length + hosted.length}</span>
            <p>Total</p>
          </div>
        </div>
      </div>

      {/* HOSTED MATCHES */}
      <section className="profile-section">
        <h3>Hosted Matches</h3>

        {hosted.length === 0 ? (
          <div className="empty-box">
            <p>No hosted matches yet</p>
            <button onClick={() => navigate("/creatematch")}>
              Create Your First Match
            </button>
          </div>
        ) : (
          <div className="match-list">
            {hosted.map((m) => (
              <div key={m.id} className="mini-match">
                <h4>{m.title}</h4>
                <p>{m.sport} • {m.location}</p>
                <span>{m.date} @ {m.time}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* JOINED MATCHES */}
      <section className="profile-section">
        <h3>Joined Matches</h3>

        {joined.length === 0 ? (
          <div className="empty-box">
            <p>No joined matches yet</p>
          </div>
        ) : (
          <div className="match-list">
            {joined.map((m) => (
              <div key={m.id} className="mini-match">
                <h4>{m.title}</h4>
                <p>{m.sport} • {m.location}</p>
                <span>{m.date} @ {m.time}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
    <Footer />
        </> 
  );
}
