import { useEffect, useRef } from "react";
import useGridStore from "@stores/useGridStore";
import GridContainer from "@features/grid/components/GridContainer";
import useMovieStore from "@stores/useMovieStore";
import Navbar from "@components/Navbar/Navbar";
import useDarkModeStore from '@stores/useDarkModeStore';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  position: relative;
`;

const App = () => {
  const containerRef = useRef(null);
  const setGridData = useGridStore((state) => state.setGridData);
  const {moviesByGenre, fetchGenres, fetchMoviesForGenres, genres} = useMovieStore();
  const { darkMode } = useDarkModeStore();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  useEffect(() => {
    if (genres && genres.length > 0) {
      fetchMoviesForGenres(genres.map(genre => genre.id));
    }
  }, [genres, fetchMoviesForGenres]);

  useEffect(() => {
    if (!moviesByGenre) {
      return;
    }
    //made the 3rd on purpose smaller to test functionality
    const rows = Object.values(moviesByGenre).map((movies, index) => ({
      category: movies.genreName,
      items: index === 2 ? (movies.items || []).slice(0, 3) : (movies.items || [])
    }));
    setGridData(rows);

  }, [moviesByGenre, setGridData]);



  useEffect(() => {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(darkMode ? 'dark-mode' : 'light-mode');
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [darkMode]);

  return (
    <AppContainer>
      <Navbar />
      <MainContent>
        <GridContainer />
      </MainContent>
    </AppContainer>
  );
};

export default App;
