import  { useRef, useEffect } from 'react';
import useGridStore from '@stores/useGridStore';
import { getPosterUrl } from '@/features/grid/constants';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const StyledGridCard = styled.div`
  padding: 0.3rem;
  width: 200px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  color: ${({ $isSelected }) => $isSelected ? 'white' : 'black'};
  border: ${({ $isSelected }) => $isSelected ? '4px solid #1e40af' : '2px solid #ccc'};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover ;
  background-repeat: no-repeat;
  @media (max-width: 1200px) {
    width: 180px;
    height: 270px;
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 210px;
    padding: 0.25rem;
  }
`;


const GridCard = ({ item, rowIndex, colIndex }) => {
  const selected = useGridStore((state) => state.selected);
  const isSelected = selected.row === rowIndex && selected.col === colIndex;
  const posterUrl = getPosterUrl(item.poster_path);
  const cardRef = useRef(null);

  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [isSelected]);

  return (
    <div ref={cardRef} data-testid="grid-card">
      <StyledGridCard
        $isSelected={isSelected}
        img={posterUrl}
      >
      </StyledGridCard>
    </div>
  );
};

GridCard.propTypes = {
  item: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
};

export default GridCard;

