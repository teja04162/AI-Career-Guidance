import { motion } from "framer-motion";
import SkillGapChart from "./SkillGapChart";
import DownloadReport from "./DownloadReport";
import ResumeTips from "./ResumeTips";
import AIScoreGauge from "./AIScoreGauge";

// 🔥 PDF utilities
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Dashboard({ result }) {

  // 📄 PDF DOWNLOAD FUNCTION
  const downloadPDF = async () => {
    const element = document.getElementById("career-report");

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("AI_Career_Report.pdf");
  };

  return (
    <motion.div
      className="glass dashboard"
      id="career-report"   // ✅ REQUIRED FOR PDF
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ width: "380px" }}
    >
      <h2>Analysis Result</h2>

      {/* 📄 DOWNLOAD BUTTON */}
      <motion.button
        className="ai-btn"
        onClick={downloadPDF}
        style={{ marginBottom: "16px" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        📄 Download AI Career Report
      </motion.button>

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

      {/* 📄 Optional existing download component */}
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
