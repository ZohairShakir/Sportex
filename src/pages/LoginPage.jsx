import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const navigate = useNavigate(); 

  return (
    <div className="page">
      <Login />
    </div>
  );
}
