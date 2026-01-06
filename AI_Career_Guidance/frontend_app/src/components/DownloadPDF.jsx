import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DownloadPDF() {
  const download = async () => {
    const element = document.getElementById("report");
    const canvas = await html2canvas(element);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(img, "PNG", 10, 10, 180, 160);
    pdf.save("AI_Career_Report.pdf");
  };

  return <button onClick={download}>📄 Download PDF Report</button>;
}
