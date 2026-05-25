import "./FloatingHearts.css";

const FloatingHearts = () => {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, index) => (
        <span
          className="floating-heart"
          key={`heart-${index}`}
          style={{
            "--delay": `${index * 0.8}s`,
            "--duration": `${10 + (index % 5)}s`,
            "--left": `${4 + index * 7}%`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
