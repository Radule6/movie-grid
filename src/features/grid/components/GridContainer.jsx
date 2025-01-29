import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import useStore from '@stores/useStore';
import Grid from '@features/grid/components/Grid';

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
`;

const GridContainer = () => {
  const handleKeyDown = useStore((state) => state.handleKeyDown);
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
