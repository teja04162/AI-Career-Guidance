import { motion } from "framer-motion";

export default function AIScoreGauge({ score }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="160" height="160">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />

        {/* Animated progress */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke="url(#grad)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Gradient */}
        <defs>
          <linearGradient id="grad">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>
      </svg>

      <div className="metric">{score}%</div>
      <div style={{ opacity: 0.7 }}>AI Confidence</div>
    </div>
  );
}
