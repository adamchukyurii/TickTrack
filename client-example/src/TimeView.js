function TimeView({ currentDate }) {
  return (
    <div
      style={{
        margin: "16px",
        fontSize: "24px",
      }}
    >
      {currentDate?.toLocaleString("cs")}
    </div>
  );
}

export default TimeView;
