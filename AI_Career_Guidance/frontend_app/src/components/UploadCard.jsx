import { motion } from "framer-motion";

export default function UploadCard({ onAnalyze, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onAnalyze(formData);
  };

  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        width: "340px",
        padding: "24px",
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
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
          className="ai-btn"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Analyzing..." : "Analyze Career"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
