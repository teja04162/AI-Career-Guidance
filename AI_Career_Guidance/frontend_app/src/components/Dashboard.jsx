import { motion } from "framer-motion";
import SkillGapChart from "./SkillGapChart";
import DownloadReport from "./DownloadReport";
import ResumeTips from "./ResumeTips";
import AIScoreGauge from "./AIScoreGauge"; // ✅ AI Gauge

export default function Dashboard({ result }) {
  return (
    <motion.div
      className="glass dashboard"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ width: "380px" }}
    >
      <h2>Analysis Result</h2>

      {/* 🎯 Circular AI Score Gauge */}
      <motion.div
        style={{ marginTop: 20 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
      >
        <AIScoreGauge score={result.placement_probability} />
      </motion.div>

      {/* Placement Probability */}
      <motion.div
        style={{ marginTop: 10, textAlign: "center" }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.25 }}
      >
        <div className="metric">
          {result.placement_probability}%
        </div>
        <div className="label">Placement Probability</div>
      </motion.div>

      {/* Career Path */}
      <motion.p
        style={{ marginTop: 20 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        <strong>Recommended Career:</strong><br />
        {result.career_path}
      </motion.p>

      {/* Explanation */}
      <motion.p
        style={{ opacity: 0.8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.45 }}
      >
        {result.explanation}
      </motion.p>

      {/* 📊 Skill Gap Chart */}
      {result.skill_gaps && (
        <motion.div
          style={{ marginTop: 30 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <SkillGapChart skills={result.skill_gaps} />
        </motion.div>
      )}

      {/* 📝 Resume Improvement Tips */}
      {result.resume_tips && (
        <motion.div
          style={{ marginTop: 30 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ResumeTips tips={result.resume_tips} />
        </motion.div>
      )}

      {/* 📄 Download AI Report */}
      <motion.div
        style={{ marginTop: 30 }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <DownloadReport result={result} />
      </motion.div>
    </motion.div>
  );
}
