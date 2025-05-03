function PersonAvatar({ avatar }) {
  return (
    <div style={{ gridArea: "avatar" }}>
      <img src={avatar} alt="a" width="32px" />
    </div>
  );
}

export default PersonAvatar;
