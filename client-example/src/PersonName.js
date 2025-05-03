function PersonName({ name }) {
  return (
    <div style={{ gridArea: "name", fontSize: "24px", fontWeight: "bold" }}>
      {name}
    </div>
  );
}

export default PersonName;
