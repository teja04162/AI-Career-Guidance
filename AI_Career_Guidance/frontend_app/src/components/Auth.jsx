import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import "./Auth.css";

export default function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/login" : "/signup";

      // ✅ JSON ONLY — matches Flask backend
      const res = await api.post(endpoint, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      onAuthSuccess();
    } catch (err) {
      console.error(err);

      // ✅ SHOW REAL BACKEND ERROR
      setError(
        err.response?.data?.error ||
          "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          className="auth-card glass"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="auth-title">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="auth-subtitle">
            AI-powered career guidance starts here
          </p>

          <form onSubmit={submit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="auth-error">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : mode === "login"
                ? "Login"
                : "Sign Up"}
            </motion.button>
          </form>

          <p className="auth-switch">
            {mode === "login" ? "No account?" : "Already have an account?"}
            <span
              onClick={() =>
                setMode(mode === "login" ? "signup" : "login")
              }
            >
              {mode === "login" ? " Sign up" : " Login"}
            </span>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
