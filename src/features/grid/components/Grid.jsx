import React from 'react';
import useStore from '@stores/useStore';
import GridCard from '@features/grid/components/GridCard';
import { VISIBLE_CARDS } from '@features/grid/constants';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${VISIBLE_CARDS}, 1fr);
  column-gap: 16px;
`;

const CategoryTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 600;
`;

const Grid = () => {
  const viewOffsets = useStore((state) => state.viewOffsets);
  const gridData = useStore((state) => state.gridData);

  return (
    <StyledGrid>
      {gridData.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`}>
          <CategoryTitle>
            {row[0]?.category || `Category ${rowIndex + 1}`}
          </CategoryTitle>
          <GridRow>
            {row
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
              })}
          </GridRow>
        </div>
      ))}
    </StyledGrid>
  );
};

export default Grid;
