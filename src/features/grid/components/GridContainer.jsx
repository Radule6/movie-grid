import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import useGridStore from '@stores/useGridStore';
import Grid from '@features/grid/components/Grid';

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  padding: 2rem;
  overflow-y: auto;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const GridContainer = () => {
  const handleKeyDown = useGridStore((state) => state.handleKeyDown);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <StyledContainer
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Grid />
    </StyledContainer>
  );
};

export default GridContainer;
