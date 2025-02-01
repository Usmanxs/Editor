

interface DividerElementProps {
  style?: React.CSSProperties;
}

const DividerElement: React.FC<DividerElementProps> = ({ style }) => {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "2px solid #cccccc",
        width: "100%",
        margin: "16px 0",
        ...style, // Allow additional styling overrides
      }}
    />
  );
};

export default DividerElement;
