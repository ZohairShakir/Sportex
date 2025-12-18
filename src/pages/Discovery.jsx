import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, rtdb } from "../firebase";
import { ref, onValue, update, remove, get } from "firebase/database";
import "./HomePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer"

export default function HomePage() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");

  /* Redirect if not logged in */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
    });
    return () => unsub();
  }, [navigate]);

  /* Fetch all matches */
  useEffect(() => {
    const matchesRef = ref(rtdb, "matches");

    onValue(matchesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMatches([]);
        return;
      }

      const list = Object.entries(data).map(([id, value]) => ({
        id,
        players: value.players || [],
        ...value,
      }));

      setMatches(list.reverse());
    });
  }, []);

  /* Search filter */
  const filteredMatches = matches.filter((match) => {
    const q = search.toLowerCase();
    return (
      match.title?.toLowerCase().includes(q) ||
      match.sport?.toLowerCase().includes(q) ||
      match.location?.toLowerCase().includes(q)
    );
  });

  /* Join match */
  const joinMatch = async (matchId) => {
    if (!auth.currentUser) return;

    const playersRef = ref(rtdb, `matches/${matchId}/players`);
    const snap = await get(playersRef);
    const players = snap.val() || [];

    if (players.includes(auth.currentUser.uid)) {
      alert("You already joined this match");
      return;
    }

    await update(ref(rtdb, `matches/${matchId}`), {
      players: [...players, auth.currentUser.uid],
    });

    alert("Joined successfully!");
  };

  /* Delete match (owner only) */
  const deleteMatch = async (matchId) => {
    if (!confirm("Delete this match permanently?")) return;
    await remove(ref(rtdb, `matches/${matchId}`));
  };

  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="discover-section">
          <h1 className="discover-title">Discover Games</h1>

          {/* SEARCH BAR */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by sport, location or match name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* MATCH LIST */}
          <div className="matches-list">
            {filteredMatches.length > 0 ? (
              filteredMatches.map((match) => {
                const playersJoined = match.players.length;
                const playersRequired = Number(match.playersRequired || 0);

                const isOwner =
                  auth.currentUser?.uid === match.creatorId;

                return (
                  <div key={match.id} className="match-card-new">
                    {/* HEADER */}
                    <div className="match-header">
                      <div>
                        <h3 className="match-title">
                          {match.title || match.sport}
                          <span className="level-badge">
                            {match.level}
                          </span>
                        </h3>

                        <div className="match-meta">
                          <span>📍 {match.location}</span>
                          <span>
                            🕒 {match.date} · {match.time}
                          </span>
                        </div>
                      </div>

                      <div className="players-pill">
                        👥 {playersJoined}/{playersRequired}
                      </div>
                    </div>

                    <hr />

                    {/* ORGANIZER */}
                    <div className="match-organizer">
                      <div className="avatar-circle">
                        {(match.creatorName || "U")[0].toUpperCase()}
                      </div>
                      <span>
                        Organized by {match.creatorName || "Unknown"}
                      </span>
                    </div>

                    {/* ACTIONS */}
                    <div className="match-actions-new">
                      <button
                        className="join-btn-full"
                        onClick={() => joinMatch(match.id)}
                      >
                        Join Match
                      </button>

                      {isOwner && (
                        <button
                          className="delete-btn-outline"
                          onClick={() => deleteMatch(match.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-results">
                <p>No matches found</p>
                <button
                  className="create-btn large"
                  onClick={() => navigate("/creatematch")}
                >
                  Create a Match
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
