import React from 'react';
import useStore from '@stores/useStore';
import styled from 'styled-components';

const StyledGridCard = styled.div`
  padding: 20px;
  width: 300px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  color: ${({ isSelected }) => isSelected ? 'white' : 'black'};
  background-color: gray;
  border: ${({ isSelected }) => isSelected ? '2px solid #007bff' : '2px solid #ccc'};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GridCard = ({ item, rowIndex, colIndex }) => {
  const selected = useStore((state) => state.selected);
  const isSelected = selected.row === rowIndex && selected.col === colIndex;

  return (
    <StyledGridCard
      isSelected={isSelected}
      onClick={() => handleCardClick(rowIndex, colIndex)}
    >
      {item}
    </StyledGridCard>
  );
};

export default GridCard;
