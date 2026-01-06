import Dashboard from "./Dashboard";
import SkillGap from "./SkillGap";
import RoleSuggest from "./RoleSuggest";
import DownloadPDF from "./DownloadPDF";

export default function ResultCard({ result }) {
  const probability = result.placement_prob || result.placement_probability || 0;

  return (
    <div id="report">
      <h2>Analysis Result</h2>

      <Dashboard probability={probability} />
      <RoleSuggest role={result.role} />
      <SkillGap resumeSkills={result.skills} role={result.roleType} />

      <DownloadPDF />
    </div>
  );
}
