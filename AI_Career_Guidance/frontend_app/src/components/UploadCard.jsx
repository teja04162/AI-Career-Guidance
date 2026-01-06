import { motion } from "framer-motion";

export default function UploadCard({ onAnalyze, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onAnalyze(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      style={styles.card}
    >
      <h2>AI Career Guidance</h2>
      <p style={{ opacity: 0.7 }}>Upload your resume to begin</p>

      <input type="file" name="resume" accept=".pdf" required />
      <input name="cgpa" placeholder="CGPA" required />
      <input name="internships" placeholder="Internships" required />
      <input name="projects" placeholder="Projects" required />
      <input name="certifications" placeholder="Certifications" required />

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        {loading ? "Analyzing..." : "Analyze Career"}
      </motion.button>
    </motion.form>
  );
}

const styles = {
  card: {
    width: "340px",
    padding: "24px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
};
