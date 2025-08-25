export default function Footer() {
  return (
    <footer 
      style={{
        backgroundColor: "#000000ff",
        padding: "20px",
        textAlign: "center",
        fontSize: 14,
        color: "#ffffffff",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} Bike Shop — Assignment Project |
        Built by <a >T.Anh</a>
      </p>
    </footer>
  );
}
