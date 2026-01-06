export default function ProbabilityBar({ value }) {
  return (
    <div>
      <p>Placement Probability</p>
      <div style={styles.track}>
        <div style={{...styles.fill, width: `${value}%`}}>
          {value}%
        </div>
      </div>
    </div>
  );
}

const styles = {
  track: {
    height: "14px",
    background: "#020617",
    borderRadius: "10px",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #22d3ee, #4f46e5)",
    textAlign: "right",
    paddingRight: "8px",
    fontSize: "12px",
  }
};
