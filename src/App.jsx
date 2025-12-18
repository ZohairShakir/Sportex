import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreateMatch from "./pages/CreateMatch";
import CreateProfile from "./pages/CreateProfile";
import Discovery from "./pages/Discovery";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/creatematch" element={<CreateMatch />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/discover" element={<Discovery />} />
      </Routes>
    </Router>
  );
}

export default App;
