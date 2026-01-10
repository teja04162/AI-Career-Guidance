import { useState } from "react";
import { motion } from "framer-motion";

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://ai-career-guidance-3.onrender.com/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      onAuthSuccess();
    } catch (err) {
      alert(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      className="glass"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ width: "320px", padding: "24px" }}
    >
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

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

      <motion.button
        className="ai-btn"
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
      >
        {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
      </motion.button>

      <p
        style={{ cursor: "pointer", opacity: 0.7 }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "New user? Sign up" : "Already have an account? Login"}
      </p>
    </motion.form>
  );
}
