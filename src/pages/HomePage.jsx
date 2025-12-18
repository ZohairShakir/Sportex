import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, rtdb } from "../firebase";
import { ref, onValue, update, remove, get } from "firebase/database";
import "./HomePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer"

const RANKS = [
  { name: "Bronze", min: 0 },
  { name: "Silver", min: 200 },
  { name: "Gold", min: 500 },
  { name: "Platinum", min: 900 },
  { name: "Diamond", min: 1400 },
  { name: "Elite", min: 2000 },
];

const getNextRank = (xp) => {
  for (let i = 0; i < RANKS.length; i++) {
    if (xp < RANKS[i].min) {
      return RANKS[i];
    }
  }
  return null;
};

export default function HomePage() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [userRank, setUserRank] = useState({
  xp: 0,
  rank: "Bronze",
});

  const [stats, setStats] = useState({
  hosted: 0,
  joined: 0,
  upcoming: 0,
});

  /* Redirect if not logged in */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
    });
    return () => unsub();
  }, [navigate]);
  
  useEffect(() => {
  if (!auth.currentUser) return;

  const matchesRef = ref(rtdb, "matches");

  onValue(matchesRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    const matches = Object.values(data);
    const uid = auth.currentUser.uid;

    let hosted = 0;
    let joined = 0;
    let upcoming = 0;

    const today = new Date();

    matches.forEach((match) => {
      const matchDate = new Date(`${match.date} ${match.time}`);

      if (match.creatorId === uid) {
        hosted++;
      }

      if (match.players?.includes(uid)) {
        joined++;
      }

      if (
        (match.creatorId === uid || match.players?.includes(uid)) &&
        matchDate > today
      ) {
        upcoming++;
      }
    });

    setStats({ hosted, joined, upcoming });
  });
}, []);
  useEffect(() => {
  if (!auth.currentUser) return;

  const matchesRef = ref(rtdb, "matches");

  onValue(matchesRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      setUpcomingEvents([]);
      return;
    }

    const uid = auth.currentUser.uid;
    const now = new Date();

    const upcoming = Object.values(data)
      .filter((match) => {
        const matchDate = new Date(`${match.date} ${match.time}`);

        const isUserInvolved =
          match.creatorId === uid ||
          match.players?.includes(uid);

        return isUserInvolved && matchDate > now;
      })
      .sort(
        (a, b) =>
          new Date(`${a.date} ${a.time}`) -
          new Date(`${b.date} ${b.time}`)
      )
      .slice(0, 3); // only top 3

    setUpcomingEvents(upcoming);
  });
}, []);
  useEffect(() => {
  if (!auth.currentUser) return;

  const userRef = ref(rtdb, `users/${auth.currentUser.uid}`);

  onValue(userRef, (snapshot) => {
    if (!snapshot.exists()) return;

    const data = snapshot.val();
    setUserRank({
      xp: data.xp || 0,
      rank: data.rank || "Bronze",
    });
  });
}, []);

  useEffect(() => {
  if (!auth.currentUser) return;

  const matchesRef = ref(rtdb, "matches");

  onValue(matchesRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      setRecentMatches([]);
      return;
    }

    const uid = auth.currentUser.uid;
    const now = new Date();

    const recent = Object.values(data)
      .filter((match) => {
        const matchDate = new Date(`${match.date} ${match.time}`);

        const isUserInvolved =
          match.creatorId === uid ||
          match.players?.includes(uid);

        return isUserInvolved && matchDate < now;
      })
      .sort(
        (a, b) =>
          new Date(`${b.date} ${b.time}`) -
          new Date(`${a.date} ${a.time}`)
      )
      .slice(0, 3);

    setRecentMatches(recent);
  });
}, []);

  /* Fetch matches */
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
    const joinMatch = async (matchId) => {
  const uid = auth.currentUser.uid;

  const userRef = ref(rtdb, `users/${uid}`);
  const snap = await get(userRef);
  const user = snap.val() || { xp: 0 };

  const newXP = (user.xp || 0) + 20;
  const newRank = getRankFromXP(newXP);

  await update(userRef, {
    xp: newXP,
    rank: newRank,
  });

  // existing join logic stays
};
  
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

  /* Delete match */
  const deleteMatch = async (matchId) => {
    if (!confirm("Delete this match permanently?")) return;
    await remove(ref(rtdb, `matches/${matchId}`));
  };

  return (
  <>
    <Navbar />
    <div className="home-container">
      <div className="page-wrapper">
        <div className="page-container">

          {/* QUICK STATS */}
          <div className="quick-stats">
            <div className="stat-card">
              <h3>{stats.hosted}</h3>
              <p>Matches Hosted</p>
            </div>

            <div className="stat-card">
              <h3>{stats.joined}</h3>
              <p>Matches Played</p>
            </div>

            <div className="stat-card">
              <h3>{stats.upcoming}</h3>
              <p>Upcoming Matches</p>
            </div>
          </div>

          {/* UPCOMING EVENTS */}
          <div className="upcoming-section">
            <h2 className="section-title">Upcoming Events</h2>
            {upcomingEvents.length > 0 ? (
              <div className="upcoming-list">
                {upcomingEvents.map((match, index) => (
                  <div key={index} className="upcoming-card">
                    <div>
                      <h4>{match.name}</h4>
                      <p>{match.sport} • {match.location}</p>
                    </div>
                    <span className="event-date">{match.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-upcoming">
                <p>No upcoming events yet</p>
              </div>
            )}
          </div>

          {/* RECENT MATCHES */}
          <div className="recent-section">
            <h2 className="section-title">Recent Matches</h2>
            {recentMatches.length > 0 ? (
              <div className="recent-list">
                {recentMatches.map((match, index) => (
                  <div key={index} className="recent-card">
                    <div>
                      <h4>{match.name}</h4>
                      <p>{match.sport} • {match.location}</p>
                    </div>
                    <span className="status-badge completed">Completed</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-recent">
                <p>No matches played yet</p>
              </div>
            )}
          </div>
          <div className="rank-card">
  <div className="rank-header">
    <span className="rank-badge">{userRank.rank}</span>
    <span className="rank-sub">Your Current Rank</span>
  </div>

  <div className="rank-main">
    <h2 className="xp-value">
      {userRank.xp}
      <span> XP</span>
    </h2>
  </div>

  {/* Progress */}
  {(() => {
    const next = getNextRank(userRank.xp);
    if (!next) return <p className="elite-text">Elite Tier Achieved</p>;

    const prev =
      RANKS[RANKS.findIndex((r) => r.name === userRank.rank)]?.min || 0;

    const progress =
      ((userRank.xp - prev) / (next.min - prev)) * 100;

    return (
      <>
        <div className="xp-bar">
          <div
            className="xp-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="xp-next">
          {next.min - userRank.xp} XP to {next.name}
        </p>
      </>
    );
  })()}
</div>

        </div>
      </div>
    </div>
    <Footer />
  </>
);}