import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import useGridStore from '@stores/useGridStore';
import Grid from '@features/grid/components/Grid';
import useDarkModeStore from '@stores/useDarkModeStore';

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  outline: none;
  padding: 2rem;
  min-height: 100%;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const GridContainer = () => {
  const handleKeyDown = useGridStore((state) => state.handleKeyDown);
  const containerRef = useRef(null);
  const darkMode = useDarkModeStore((state) => state.darkMode);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [darkMode]);

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
