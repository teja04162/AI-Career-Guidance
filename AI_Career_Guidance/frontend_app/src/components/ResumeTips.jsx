import { motion } from "framer-motion";

export default function ResumeTips({ tips }) {
  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      style={{ marginTop: 30 }}
    >
      <h3>📝 Resume Improvement Tips</h3>
      <ul style={{ paddingLeft: 18, marginTop: 10 }}>
        {tips.map((tip, i) => (
          <li key={i} style={{ marginBottom: 8, opacity: 0.85 }}>
            {tip}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
