export default function SkillGap({ resumeSkills = [], role }) {
  const roleSkills = {
    "Machine Learning Engineer": [
      "Python",
      "Machine Learning",
      "AI",
      "Statistics",
      "Data Science"
    ],
    "Web Developer": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node"
    ],
    "Data Analyst": [
      "Python",
      "SQL",
      "Data Analysis",
      "Excel"
    ],
    "General IT Roles": []
  };

  const requiredSkills = roleSkills[role] || [];

  const missingSkills = requiredSkills.filter(
    skill => !resumeSkills.includes(skill)
  );

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Skill Gap Analysis</h3>

      {missingSkills.length === 0 ? (
        <p style={styles.success}>✅ You already match the required skills</p>
      ) : (
        <ul style={styles.list}>
          {missingSkills.map((skill, index) => (
            <li key={index} style={styles.item}>❌ {skill}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#020617",
    padding: "16px",
    borderRadius: "10px",
    marginTop: "20px"
  },
  title: {
    marginBottom: "10px",
    color: "#38bdf8"
  },
  list: {
    paddingLeft: "20px"
  },
  item: {
    color: "#fca5a5"
  },
  success: {
    color: "#22c55e"
  }
};
