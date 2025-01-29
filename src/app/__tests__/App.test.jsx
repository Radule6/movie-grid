import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import App from '../App';

// Mock all the stores
const mockFetchGenres = vi.fn();
const mockFetchMoviesForGenres = vi.fn();
const mockSetGridData = vi.fn();

vi.mock('@stores/useMovieStore', () => ({
  default: () => ({
    fetchGenres: mockFetchGenres,
    fetchMoviesForGenres: mockFetchMoviesForGenres,
    genres: [{ id: 1, name: 'Action' }],
    moviesByGenre: {
      1: {
        genreName: 'Action',
        items: [{ id: 1, title: 'Movie 1' }]
      }
    }
  })
}));

vi.mock('@stores/useGridStore', () => ({
  default: (selector) => {
    const state = {
      setGridData: mockSetGridData
    };
    return selector(state);
  }
}));

vi.mock('@stores/useDarkModeStore', () => ({
  default: () => ({
    darkMode: false
  })
}));

// Mock the child components
vi.mock('@components/Navbar/Navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>
}));

vi.mock('@features/grid/components/GridContainer', () => ({
  default: () => <div data-testid="grid-container">GridContainer</div>
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders main components', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('navbar')).toBeInTheDocument();
    expect(getByTestId('grid-container')).toBeInTheDocument();
  });

  it('fetches initial data on mount', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(mockFetchGenres).toHaveBeenCalledTimes(1);
    });
  });

  it('fetches movies when genres are available', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(mockFetchMoviesForGenres).toHaveBeenCalledWith([1]);
    });
  });

  it('sets grid data when movies are available', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(mockSetGridData).toHaveBeenCalledWith([{
        category: 'Action',
        items: [{ id: 1, title: 'Movie 1' }]
      }]);
    });
  });
});
