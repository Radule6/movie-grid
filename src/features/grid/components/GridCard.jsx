import  { useRef, useEffect } from 'react';
import useGridStore from '@stores/useGridStore';
import { getPosterUrl } from '@/features/grid/constants';
import PropTypes from 'prop-types';
import { StyledGridCard } from '@features/grid/styles/GridStyledComponentsStyle';

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

