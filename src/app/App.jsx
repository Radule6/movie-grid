import React, { useEffect, useRef } from "react";
import useGridStore from "@stores/useGridStore";
import GridContainer from "@features/grid/components/GridContainer";
import useMovieStore from "@stores/useMovieStore";

const App = () => {
  const containerRef = useRef(null);
  const setGridData = useGridStore((state) => state.setGridData);
  const {moviesByGenre, fetchGenres, fetchMoviesForGenres, genres} = useMovieStore();

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

    const rows = Object.values(moviesByGenre).map((movies, index) => ({
      category: movies.genreName,
      items: index === 2 ? (movies.items || []).slice(0, 3) : (movies.items || [])
    }));
    setGridData(rows);

  }, [moviesByGenre, setGridData]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <GridContainer />
  );
};

export default App;
