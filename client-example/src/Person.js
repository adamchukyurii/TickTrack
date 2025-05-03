import PersonAvatar from "./PersonAvatar";
import PersonName from "./PersonName";
import PersonPosition from "./PersonPosition";

function Person(props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "40px auto",
        gridTemplateRows: "32px 24px",
        gridTemplateAreas: '"avatar name" "avatar position"',
        margin: "8px",
        padding: "8px",
        border: `1px ${props.person.gender === "m" ? "blue" : "pink"} solid`,
        borderRadius: "4px",
        color: props.theme === "light" ? "black" : "white",
        background: props.theme === "light" ? "white" : "grey",
      }}
    >
      <PersonAvatar avatar={props.person.avatar} />
      <PersonName name={props.person.name} />
      <PersonPosition position={props.person.position} />
    </div>
  );
}

export default Person;
