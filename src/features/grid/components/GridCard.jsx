import React from 'react';
import useStore from '@stores/useStore';
import styled from 'styled-components';

const StyledGridCard = styled.div`
  padding: 0.5rem;
  width: 220px;
  height: 120px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  color: ${({ $isSelected }) => $isSelected ? 'white' : 'black'};
  background-color: gray;
  border: ${({ $isSelected }) => $isSelected ? '2px solid #007bff' : '2px solid #ccc'};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1200px) {
    width: 160px;
  }

  @media (max-width: 768px) {
    width: 120px;
    padding: 0.25rem;
  }
`;

const GridCard = ({ item, rowIndex, colIndex }) => {
  const selected = useStore((state) => state.selected);
  const isSelected = selected.row === rowIndex && selected.col === colIndex;

  return (
    <StyledGridCard
      $isSelected={isSelected}
    >
      {item}
    </StyledGridCard>
  );
};

export default GridCard;
