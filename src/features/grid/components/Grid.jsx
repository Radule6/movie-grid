import React, { useState, useEffect } from 'react';
import useStore from '@stores/useStore';
import GridCard from '@features/grid/components/GridCard';
import { getVisibleCards } from '@features/grid/constants';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: fit-content;
  margin: 0 auto;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.$visibleCards}, 1fr);
  gap: 3rem;
  justify-items: center;
`;

const CategoryTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 14px;
  font-weight: 600;
`;

const Grid = () => {
  const viewOffsets = useStore((state) => state.viewOffsets);
  const gridData = useStore((state) => state.gridData);
  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <StyledGrid>
      {gridData.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`}>
          <CategoryTitle>
            {row[0]?.category || `Category ${rowIndex + 1}`}
          </CategoryTitle>
          <GridRow $visibleCards={visibleCards}>
            {row
              .slice(viewOffsets[rowIndex], viewOffsets[rowIndex] + visibleCards)
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
