// pages/Apply.jsx
import { useState } from "react";
import { ref, push } from "firebase/database";
import { rtdb } from "../firebase";
import Navbar from "../components/Navbar";
import "./Apply.css";

export default function Apply() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    skills: "",
    motivation: "",
    link: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitApplication = async () => {
    if (!form.name || !form.email || !form.role || !form.motivation) {
      alert("Please fill required fields");
      return;
    }

    await push(ref(rtdb, "applications"), {
      ...form,
      createdAt: Date.now(),
    });

    alert("Application submitted 🚀");
    setForm({
      name: "",
      email: "",
      role: "",
      skills: "",
      motivation: "",
      link: "",
    });
  };

  return (
    <>
      <div className="apply-container">
        <h1>Join the Sportex Team</h1>
        <p className="subtitle">
          We’re building something exciting. Come build it with us.
        </p>

        <div className="apply-form">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>UI/UX Designer</option>
            <option>Community Manager</option>
            <option>Marketing</option>
          </select>

          <input
            name="skills"
            placeholder="Your skills (optional)"
            value={form.skills}
            onChange={handleChange}
          />

          <textarea
            name="motivation"
            placeholder="Why do you want to join Sportex?"
            value={form.motivation}
            onChange={handleChange}
          />

          <input
            name="link"
            placeholder="Portfolio / GitHub / LinkedIn (optional)"
            value={form.link}
            onChange={handleChange}
          />

          <button onClick={submitApplication}>
            Submit Application
          </button>
        </div>
      </div>
    </>
  );
}
  