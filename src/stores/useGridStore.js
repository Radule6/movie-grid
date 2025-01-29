import { create } from "zustand";
import { getVisibleCards } from "@/features/grid/constants";
const visibleCards = getVisibleCards();

const useGridStore = create((set) => ({
  selected: { row: 0, col: 0 },
  viewOffsets: [],
  gridData: [],
  
  setGridData: (newGridData) => 
    set({
      gridData: newGridData,
      viewOffsets: newGridData.map(() => 0),
      selected: { row: 0, col: 0 }
    }),

  handleKeyDown: (event) => {
    set((state) => {
      let { row, col } = state.selected;
      let newOffsets = [...state.viewOffsets];
      const visualPosition = col - newOffsets[row];

      switch (event.key) {
        case "ArrowUp": {
          const canMoveUp = row > 0;
          if (canMoveUp) {
            row = row - 1;
            col = Math.min(
              newOffsets[row] + visualPosition,
              state.gridData[row].items.length - 1
            );
          }
          break;
        }

        case "ArrowDown": {
          const canMoveDown = row < state.gridData.length - 1;
          if (canMoveDown) {
            row = row + 1;
            col = Math.min(
              newOffsets[row] + visualPosition,
              state.gridData[row].items.length - 1
            );
          }
          break;
        }

        case "ArrowLeft": {
          const isNotFirstInRow = col > 0;
          const canScrollLeft = newOffsets[row] > 0;

          if (isNotFirstInRow) {
            col -= 1;
          } else if (canScrollLeft) {
            newOffsets[row] -= 1;
          }
          break;
        }

        case "ArrowRight": {
          const isNotLastInRow = col < state.gridData[row].items.length - 1;
          const canScrollRight =
            newOffsets[row] + visibleCards < state.gridData[row].items.length;

          if (isNotLastInRow) {
            col += 1;
          } else if (canScrollRight) {
            newOffsets[row] += 1;
          } else {
            col = 0;
            newOffsets[row] = 0;
          }
          break;
        }

        default:
          break;
      }
      console.log(state.gridData[row].items.length);
      col = Math.min(state.gridData[row].items.length - 1, col);
      console.log(col);
      if (col < newOffsets[row]) {
        newOffsets[row] = col;
      } else if (col >= newOffsets[row] + visibleCards) {
        newOffsets[row] = col - visibleCards + 1;
      }

      return {
        selected: { row, col },
        viewOffsets: newOffsets,
      };
    });
  },
}));

export default useGridStore;