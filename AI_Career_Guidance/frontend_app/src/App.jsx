import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadCard from "./components/UploadCard";
import Dashboard from "./components/Dashboard";
import "./styles/theme.css";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Auth from "./components/Auth";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 AUTH STATE
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // 🚀 AI ANALYSIS
  const analyzeCareer = async (formData) => {
    try {
      setResult(null);
      setLoading(true);

      const res = await fetch(
        "https://ai-career-guidance-3.onrender.com/predict",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json();
      console.log("Prediction received:", data);
      setResult(data);
    } catch (err) {
      alert("❌ Unable to connect to backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔒 BLOCK AI UNTIL LOGIN
  if (!authenticated) {
    return (
      <Auth onAuthSuccess={() => setAuthenticated(true)} />
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="app"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: "transparent",
          display: "flex",
          gap: "40px",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <UploadCard onAnalyze={analyzeCareer} loading={loading} />

        {/* 🔄 AI Loading Skeleton with Glow */}
        {loading && (
          <motion.div
            key="skeleton"
            className="glass glow"
            animate={{
              boxShadow: [
                "0 0 20px #6a5cff",
                "0 0 40px #00c6ff",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <LoadingSkeleton />
          </motion.div>
        )}

        {/* 📊 Dashboard with Smooth Scale + Slide */}
        {result && !loading && (
          <motion.div
            key="dashboard"
            className="glass"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Dashboard result={result} />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
