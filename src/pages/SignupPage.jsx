import { useNavigate } from "react-router-dom";
import Signup from "../components/Signup";
import logo from "../assets/logo.png";

export default function SignupPage() {
  const navigate = useNavigate(); 
  return (
    <div className="page">
      <Signup />
    </div>
  );
}
