import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadCard from "./components/UploadCard";
import Dashboard from "./components/Dashboard";
import "./styles/theme.css";
import LoadingSkeleton from "./components/LoadingSkeleton";
function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

 const analyzeCareer = async (formData) => {
  try {
    setResult(null);
    setLoading(true);

    const res = await fetch(
      "https://ai-career-guidance-3.onrender.com/predict",
      {
        method: "POST",
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="app"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: "transparent", // ✅ important
          display: "flex",
          gap: "40px",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <UploadCard onAnalyze={analyzeCareer} loading={loading} />

{/* 🔄 AI Loading Skeleton */}
{loading && (
  <motion.div
    key="skeleton"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <LoadingSkeleton />
  </motion.div>
)}

{/* 📊 Dashboard after AI result */}
{result && !loading && (
  <motion.div
    key="dashboard"
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.5 }}
  >
    <Dashboard result={result} />
  </motion.div>
)}

      </motion.div>
    </AnimatePresence>
  );
}

export default App;
