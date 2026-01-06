import jsPDF from "jspdf";

export default function DownloadReport({ result }) {
  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.text("AI Career Guidance Report", 20, 20);
    pdf.text(`Placement Score: ${result.placement_probability}%`, 20, 40);
    pdf.text("Recommended Roles:", 20, 60);

    result.recommended_roles.forEach((r, i) => {
      pdf.text(`- ${r.title}`, 20, 75 + i * 10);
    });

    pdf.save("AI_Career_Report.pdf");
  };

  return (
    <button onClick={downloadPDF}>
      📄 Download AI Report
    </button>
  );
}
