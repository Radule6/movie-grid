import { useRef, useEffect } from 'react';
import useGridStore from '@stores/useGridStore';
import Grid from '@features/grid/components/Grid';
import useDarkModeStore from '@stores/useDarkModeStore';
import { StyledContainer } from '@features/grid/styles/GridStyledComponentsStyle';


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
