import React, { useState, useEffect, useRef } from "react";

const gridData = [
  ["A", "B", "C", "D", "E", "F", "G", "H"],
  ["I", "J", "K", "L", "M"],
  ["N", "O", "P", "Q", "R", "S", "T"],
  ["U", "V", "W", "X", "Y", "Z"],
  ["1", "2", "3"],
];

const VISIBLE_CARDS = 5;

const App = () => {
  const [selected, setSelected] = useState({ row: 0, col: 0 });
  const [viewOffsets, setViewOffsets] = useState(
    gridData.map(() => 0)
  );
  const [lastSelectedCols, setLastSelectedCols] = useState(() =>
    Array(gridData.length).fill(0)
  )
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event) => {
    setSelected((prevSelected) => {
      let { row, col } = prevSelected;
      let newOffsets = [...viewOffsets];
      const visualPosition = col - viewOffsets[row];

      switch (event.key) {
        case "ArrowUp":
          const canMoveUp = row > 0;
          if (canMoveUp) {
            row = row - 1;
            col = Math.min(
              viewOffsets[row] + visualPosition,
              gridData[row].length - 1
            );
          }
          break;

        case "ArrowDown":
          const canMoveDown = row < gridData.length - 1;
          if (canMoveDown) {
            row = row + 1;
            col = Math.min(
              viewOffsets[row] + visualPosition,
              gridData[row].length - 1
            );
          }
          break;

        case "ArrowLeft":
          const isNotFirstInRow = col > 0;
          const canScrollLeft = newOffsets[row] > 0;

          if (isNotFirstInRow) {
            col -= 1;
          } else if (canScrollLeft) {
            newOffsets[row] -= 1;
          }
          break;

        case "ArrowRight":
          const isNotLastInRow = col < gridData[row].length - 1;
          const canScrollRight = newOffsets[row] + VISIBLE_CARDS < gridData[row].length;

          if (isNotLastInRow) {
            col += 1;
          } else if (canScrollRight) {
            newOffsets[row] += 1;
          } else {
            // Wrap to beginning of row
            col = 0;
            newOffsets[row] = 0;
          }
          break;

        default:
          break;
      }

      col = Math.min(gridData[row].length - 1, col);

      if (col < newOffsets[row]) {
        newOffsets[row] = col;
      } else if (col >= newOffsets[row] + VISIBLE_CARDS) {
        newOffsets[row] = col - VISIBLE_CARDS + 1;
      }

      setViewOffsets(newOffsets);
      return { row, col };
    });
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        outline: "none",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${VISIBLE_CARDS}, 1fr)`,
          gap: "16px",
        }}
      >
        {gridData.map((row, rowIndex) =>
          row
            .slice(viewOffsets[rowIndex], viewOffsets[rowIndex] + VISIBLE_CARDS)
            .map((item, colIndex) => {
              const actualColIndex = colIndex + viewOffsets[rowIndex];
              return (
                <div
                  key={`${rowIndex}-${actualColIndex}`}
                  style={{
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    textAlign: "center",
                    backgroundColor:
                      selected.row === rowIndex &&
                      selected.col === actualColIndex
                        ? "#007bff"
                        : "#ffffff",
                    color:
                      selected.row === rowIndex &&
                      selected.col === actualColIndex
                        ? "#ffffff"
                        : "#000000",
                    transition: "background-color 0.2s, color 0.2s",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default App;
