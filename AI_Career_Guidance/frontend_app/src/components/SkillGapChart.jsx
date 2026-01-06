import { motion } from "framer-motion";

export default function SkillGapChart({ skills }) {
  return (
    <div className="glass">
      <h3>📊 Skill Gap Analysis</h3>

      {skills.map((skill, i) => (
        <div key={i} style={{ marginBottom: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{skill.name}</span>
            <span>{skill.score}%</span>
          </div>

          <div style={barBg}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.score}%` }}
              transition={{ duration: 0.8 }}
              style={barFill}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const barBg = {
  height: "8px",
  background: "#e5e7eb",
  borderRadius: "10px",
};

const barFill = {
  height: "100%",
  background: "linear-gradient(90deg, #22c55e, #16a34a)",
  borderRadius: "10px",
};
