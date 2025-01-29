import React from 'react';
import useStore from '@stores/useStore';

const GridCard = ({ item, rowIndex, colIndex }) => {
  const selected = useStore((state) => state.selected);
  const isSelected = selected.row === rowIndex && selected.col === colIndex;

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
        backgroundColor: isSelected ? "#007bff" : "var(--card-bg-light)",
        color: isSelected ? "#ffffff" : "#000000",
        transition: "background-color 0.2s, color 0.2s",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
      }}
    >
      {item}
    </div>
  );
};

export default GridCard;
