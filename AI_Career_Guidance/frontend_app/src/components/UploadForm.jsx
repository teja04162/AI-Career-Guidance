import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchResult = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5001/predict");
      console.log("Response:", res.data);
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("Backend connection failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      color: "#e5e7eb",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px"
    }}>
      <button onClick={fetchResult} style={{
        padding: "12px 20px",
        background: "#2563eb",
        border: "none",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer"
      }}>
        FETCH RESULT
      </button>

      {data && (
        <div style={{
          background: "#020617",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #334155"
        }}>
          <h3>Result Loaded ✅</h3>
          <p>Placement Probability: {data.placement_prob}%</p>
          <p>Career Path: {data.career_path}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
