import { motion } from "framer-motion";

export default function ConfidenceMeter({ score }) {
  let tip =
    score > 80
      ? "🔥 You are industry-ready!"
      : score > 60
      ? "🚀 Improve a few skills to boost confidence"
      : "📘 Focus on fundamentals & projects";

  return (
    <div className="glass">
      <h3>🎯 Confidence Meter</h3>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1 }}
        style={{
          height: "12px",
          borderRadius: "10px",
          background: "linear-gradient(90deg, #22c55e, #16a34a)",
        }}
      />

      <p style={{ marginTop: "12px" }}>{tip}</p>
    </div>
  );
}
