import React from 'react';
import useStore from '@stores/useStore';
import GridCard from '@features/grid/components/GridCard';
import { VISIBLE_CARDS } from '@features/grid/constants';

const Grid = () => {
  const viewOffsets = useStore((state) => state.viewOffsets);
  const gridData = useStore((state) => state.gridData);

  return (
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
              <GridCard
                key={`${rowIndex}-${actualColIndex}`}
                item={item}
                rowIndex={rowIndex}
                colIndex={actualColIndex}
              />
            );
          })
      )}
    </div>
  );
};

export default Grid;
