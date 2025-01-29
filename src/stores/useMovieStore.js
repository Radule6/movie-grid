import { create } from 'zustand';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const useMovieStore = create((set, get) => ({
    moviesByGenre: {},
    genres: [],
    loading: false,
    error: null,

    fetchGenres: async () => {
      try {
        const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await res.json();
        set({ genres: data.genres.slice(0, 4) }); 
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    },

    fetchMoviesForGenres: async (genreIds) => {
      set({ loading: true, error: null });
      const { genres } = get(); 

      try {
        const moviePromises = genreIds.map(async (genreId) => {
          const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
          const data = await res.json();
          const genre = genres.find(g => g.id === genreId);
          return { 
            genreId,
            genreName: genre?.name || 'Unknown Genre',
            items: data.results 
          };
        });

        const moviesByGenre = await Promise.all(moviePromises);
        set({ moviesByGenre, loading: false });
      } catch (error) {
        set({ error: "Failed to fetch movies", loading: false });
      }
    },
}));

export default useMovieStore;