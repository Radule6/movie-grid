import React, { useRef, useEffect } from 'react';
import useGridStore from '@stores/useGridStore';
import { getPosterUrl } from '@/features/grid/constants';
import styled from 'styled-components';

const StyledGridCard = styled.div`
  padding: 0.3rem;
  width: 200px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  color: ${({ $isSelected }) => $isSelected ? 'white' : 'black'};
  border: ${({ $isSelected }) => $isSelected ? '2px solid #007bff' : '2px solid #ccc'};
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
      const element = cardRef.current;
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (element.offsetHeight / 2);
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 400; 
      let startTime = null;

      const scroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(scroll);
      };

      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(scroll);
    }
  }, [isSelected]);

  return (
    <div ref={cardRef}>
      <StyledGridCard $isSelected={isSelected} img={posterUrl} />
    </div>
  );
};

export default GridCard;

