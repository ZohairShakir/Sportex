import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* LEFT */}
        <div className="nav-left" onClick={() => navigate("/home")}>
          <img src={logo} alt="Sportex" />
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <button className="nav-link" onClick={() => navigate("/profile")}>
            Profile
          </button>

          <button className="nav-link" onClick={() => navigate("/Discover")}>
            Discover
          </button>

          <button className="nav-primary" onClick={() => navigate("/creatematch")}>
            Create Match
          </button>

          <button className="nav-link logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
