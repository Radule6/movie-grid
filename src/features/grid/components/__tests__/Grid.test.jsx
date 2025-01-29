import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Grid from '@features/grid/components/Grid';

// Mock the getVisibleCards function
vi.mock('@features/grid/constants', () => ({
  getVisibleCards: () => 5
}));

// Mock the store with initial data
vi.mock('@stores/useGridStore', () => ({
  default: (selector) => {
    const state = {
      viewOffsets: [0, 0],
      gridData: [
        {
          category: 'Action',
          items: [
            { id: 1, title: 'Movie 1', poster_path: '/path1.jpg' },
            { id: 2, title: 'Movie 2', poster_path: '/path2.jpg' }
          ]
        },
        {
          category: 'Comedy',
          items: [
            { id: 3, title: 'Movie 3', poster_path: '/path3.jpg' },
            { id: 4, title: 'Movie 4', poster_path: '/path4.jpg' }
          ]
        }
      ]
    };
    return selector(state);
  }
}));

// Mock GridCard component
vi.mock('../GridCard', () => ({
  default: ({ item }) => <div data-testid="grid-card">{item.title}</div>
}));

describe('Grid', () => {
  it('renders categories and items', () => {
    const { getByText, getAllByTestId } = render(<Grid />);
    
    // Check categories
    expect(getByText('Action')).toBeInTheDocument();
    expect(getByText('Comedy')).toBeInTheDocument();
    
    // Check movies
    const cards = getAllByTestId('grid-card');
    expect(cards).toHaveLength(4);
  });

  it('renders correct number of items per row', () => {
    const { getAllByTestId } = render(<Grid />);
    const cards = getAllByTestId('grid-card');
    expect(cards.length).toBe(4); // 2 movies in each category
  });

  it('displays category titles', () => {
    const { getByText } = render(<Grid />);
    expect(getByText('Action')).toBeInTheDocument();
    expect(getByText('Comedy')).toBeInTheDocument();
  });
}); 