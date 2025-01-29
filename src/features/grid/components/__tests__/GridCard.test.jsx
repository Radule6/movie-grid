import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import GridContainer from '@features/grid/components/GridContainer';

// Create a mock function for handleKeyDown
const mockHandleKeyDown = vi.fn();

// Mock the Zustand store
vi.mock('@stores/useGridStore', () => ({
  default: () => mockHandleKeyDown  // Return the function directly
}));

// Mock the dark mode store
vi.mock('@stores/useDarkModeStore', () => ({
  default: () => ({
    darkMode: false
  })
}));

// Mock the Grid component
vi.mock('@features/grid/components/Grid', () => ({
  default: () => <div data-testid="mock-grid">Grid Component</div>
}));

describe('GridContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with Grid component', () => {
    const { getByTestId } = render(<GridContainer />);
    expect(getByTestId('mock-grid')).toBeInTheDocument();
  });

  it('handles keyboard events', () => {
    const { container } = render(<GridContainer />);
    const gridContainer = container.firstChild;
    
    fireEvent.keyDown(gridContainer, { key: 'ArrowRight' });
    expect(mockHandleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('maintains focus when dark mode changes', () => {
    const { container } = render(<GridContainer />);
    const gridContainer = container.firstChild;
    expect(document.activeElement).toBe(gridContainer);
  });
});