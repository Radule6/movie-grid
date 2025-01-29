import  { useState, useEffect } from 'react';
import useGridStore from '@stores/useGridStore';
import GridCard from '@features/grid/components/GridCard';
import { getVisibleCards } from '@features/grid/constants';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.$visibleCards}, 1fr);
  gap: 5rem;
  justify-items: center;
`;

const CategoryTitle = styled.h2`
  margin: 0.5rem 0;
  font-size: 17px;
  font-weight: 600;
`;

const Grid = () => {
  const viewOffsets = useGridStore((state) => state.viewOffsets);
  const gridData = useGridStore((state) => state.gridData);
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
            {row.category || `Category ${rowIndex + 1}`}
          </CategoryTitle>
          <GridRow $visibleCards={visibleCards}>
            {row.items
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
